/**
 * 深鲸诉讼可视化 · 渲染器（纯 Node，无第三方依赖）
 *
 * 输入：案件 JSON（见 skill/legal-litigation-viz.md 的 schema）
 * 输出：单文件 HTML（内联 CSS + SVG），可直接打印/发给客户，不依赖网络。
 *
 * 设计原则：
 *  - 只画用户给的事实；缺数据就留空并标注「待补」，不脑补。
 *  - 四个视图：时间轴 / 法律关系 / 证据矩阵 / 争点对照。
 *  - 页面自带打印样式，A4 横竖都能看。
 */

const ESC = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const SIDE = {
  plaintiff: { label: '原告 / 申请人视角', accent: '#2F80ED', bg: '#eef4ff' },
  defendant: { label: '被告 / 被申请人视角', accent: '#C2410C', bg: '#fff4ec' },
  neutral: { label: '中立梳理', accent: '#475569', bg: '#f1f5f9' },
};

const SIG = { red: '🔴', yellow: '🟡', white: '⚪', '🔴': '🔴', '🟡': '🟡', '⚪': '⚪' };

function norm(data) {
  const d = data && typeof data === 'object' ? data : {};
  return {
    title: String(d.title || '案件梳理'),
    caseNo: String(d.caseNo || ''),
    side: SIDE[d.side] ? d.side : 'neutral',
    summary: String(d.summary || ''),
    parties: Array.isArray(d.parties) ? d.parties : [],
    events: Array.isArray(d.events) ? d.events.filter((e) => e && (e.date || e.fact)) : [],
    relations: Array.isArray(d.relations) ? d.relations.filter((r) => r && r.from && r.to) : [],
    facts: Array.isArray(d.facts) ? d.facts : [],
    evidence: Array.isArray(d.evidence) ? d.evidence : [],
    issues: Array.isArray(d.issues) ? d.issues : [],
    gaps: Array.isArray(d.gaps) ? d.gaps : [],
  };
}

function dateKey(e) {
  const s = String(e.date || '');
  const m = s.match(/(\d{4})[-年./]?(\d{1,2})?[-月./]?(\d{1,2})?/);
  if (!m) return '9999-99-99';
  return `${m[1]}-${String(m[2] || '99').padStart(2, '0')}-${String(m[3] || '99').padStart(2, '0')}`;
}

function timeline(d) {
  const events = [...d.events].sort((a, b) => dateKey(a).localeCompare(dateKey(b)));
  if (!events.length) return '<p class="empty">还没填事件。events 里每条至少要有 date 和 fact。</p>';
  return `<ol class="tl">${events.map((e) => {
    const sig = SIG[e.significance] || SIG[e.sig] || '⚪';
    const ev = Array.isArray(e.evidence) ? e.evidence : (e.evidence ? [e.evidence] : []);
    return `<li class="tl-item sig-${sig === '🔴' ? 'red' : sig === '🟡' ? 'yellow' : 'white'}">
      <div class="tl-date">${ESC(e.date || '时间待定')}</div>
      <div class="tl-body">
        <div class="tl-fact">${ESC(e.fact || '')}</div>
        <div class="tl-meta">${e.actor ? '主体：' + ESC(e.actor) : ''}${ev.length ? ' · 证据：' + ev.map((x) => `<span class="ev">${ESC(x)}</span>`).join('') : ''}${e.note ? ' · ' + ESC(e.note) : ''}</div>
      </div>
      <div class="tl-sig" title="重要性">${sig}</div>
    </li>`;
  }).join('')}</ol>`;
}

function relations(d) {
  const nodes = [];
  const push = (id, label, role) => {
    if (!id || nodes.find((n) => n.id === id)) return;
    nodes.push({ id, label: label || id, role: role || '' });
  };
  d.parties.forEach((p) => push(p.id || p.name, p.name || p.id, p.role));
  d.relations.forEach((r) => { push(r.from, r.fromLabel || r.from); push(r.to, r.toLabel || r.to); });
  if (!nodes.length) return '<p class="empty">还没填当事人或法律关系。至少给 parties 和 relations。</p>';

  const W = 860;
  const H = nodes.length <= 2 ? 300 : Math.max(360, Math.min(520, 220 + nodes.length * 30));
  const cx = W / 2, cy = H / 2, rx = W / 2 - 160, ry = H / 2 - 90;
  const pos = {};
  if (nodes.length === 1) {
    pos[nodes[0].id] = { x: cx, y: cy };
  } else if (nodes.length === 2) {
    pos[nodes[0].id] = { x: 220, y: cy };
    pos[nodes[1].id] = { x: W - 220, y: cy };
  } else {
    nodes.forEach((n, i) => {
      const a = (Math.PI * 2 * i) / nodes.length - Math.PI / 2;
      pos[n.id] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
    });
  }
  const colorOf = (role) => /原告|申请|债权/.test(role) ? '#2F80ED' : /被告|被申请|债务/.test(role) ? '#C2410C' : '#475569';
  const edges = d.relations.map((r, i) => {
    const a = pos[r.from], b = pos[r.to];
    if (!a || !b) return '';
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const label = ESC(r.label || '');
    return `<g class="edge"><line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" marker-end="url(#arrow)"/>
      <rect x="${mx - Math.max(34, label.length * 7)}" y="${my - 13}" width="${Math.max(68, label.length * 14)}" height="24" rx="6" class="edge-bg"/>
      <text x="${mx}" y="${my + 4}" text-anchor="middle" class="edge-label">${label}</text></g>`;
  }).join('');
  const circles = nodes.map((n) => {
    const p = pos[n.id];
    const w = Math.max(96, n.label.length * 15 + 28);
    return `<g class="node"><rect x="${p.x - w / 2}" y="${p.y - 22}" width="${w}" height="44" rx="10" class="node-bg" stroke="${colorOf(n.role)}"/>
      <text x="${p.x}" y="${p.y - 3}" text-anchor="middle" class="node-name">${ESC(n.label)}</text>
      <text x="${p.x}" y="${p.y + 14}" text-anchor="middle" class="node-role" fill="${colorOf(n.role)}">${ESC(n.role)}</text></g>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" class="rel" role="img" aria-label="法律关系图">
    <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>
    ${edges}${circles}</svg>
    <p class="hint">箭头方向 = 关系指向；颜色：蓝=原告/债权，橙=被告/债务，灰=其他。</p>`;
}

function evidenceMatrix(d) {
  if (!d.evidence.length) return '<p class="empty">还没填证据。evidence 里每条给 id、name、proves（对应 facts 的 id）。</p>';
  const facts = d.facts.length ? d.facts : [];
  if (!facts.length) {
    return `<table class="m"><thead><tr><th>编号</th><th>证据</th><th>证明目的</th><th>状态</th></tr></thead><tbody>${d.evidence.map((e) => `<tr><td>${ESC(e.id || '')}</td><td>${ESC(e.name || '')}</td><td>${ESC(e.purpose || '')}</td><td>${ESC(e.status || '待补')}</td></tr>`).join('')}</tbody></table>`;
  }
  const head = facts.map((f) => `<th title="${ESC(f.text || f.id)}">${ESC(f.id || '')}</th>`).join('');
  const rows = d.evidence.map((e) => {
    const proves = new Set(Array.isArray(e.proves) ? e.proves : []);
    const cells = facts.map((f) => proves.has(f.id) ? '<td class="yes">✓</td>' : '<td class="no">—</td>').join('');
    return `<tr><td>${ESC(e.id || '')}</td><td>${ESC(e.name || '')}</td>${cells}<td>${ESC(e.status || '待补')}</td></tr>`;
  }).join('');
  const legend = `<p class="hint">✓ = 该证据用于证明该事实；— = 未对应。事实编号：${facts.map((f) => `${ESC(f.id)} ${ESC(f.text || '')}`).join('；')}</p>`;
  return `<table class="m"><thead><tr><th>证据</th><th>名称</th>${head}<th>状态</th></tr></thead><tbody>${rows}</tbody></table>${legend}`;
}

function issues(d) {
  if (!d.issues.length) return '<p class="empty">还没填争点。issues 里每条给 point、ours、theirs、evidence。</p>';
  return `<table class="m"><thead><tr><th>争点</th><th>我方主张</th><th>对方抗辩</th><th>对应证据</th><th>准备提示</th></tr></thead><tbody>${d.issues.map((x) => `<tr>
    <td class="pt">${ESC(x.point || '')}</td><td>${ESC(x.ours || '')}</td><td>${ESC(x.theirs || '')}</td>
    <td>${(Array.isArray(x.evidence) ? x.evidence : [x.evidence]).filter(Boolean).map((e) => ESC(e)).join('、')}</td>
    <td>${ESC(x.tip || '')}</td></tr>`).join('')}</tbody></table>`;
}

function gaps(d) {
  if (!d.gaps.length) return '';
  return `<section class="sec"><h2>证据缺口 / 待补</h2><ul class="gaps">${d.gaps.map((g) => `<li>${ESC(typeof g === 'string' ? g : g.text || '')}</li>`).join('')}</ul></section>`;
}

export function normalize(data) { return norm(data); }

export function renderHtml(input) {
  const d = norm(input);
  const side = SIDE[d.side];
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${ESC(d.title)} · 诉讼可视化</title>
<style>
  :root{--accent:${side.accent};--tint:${side.bg}}
  *{box-sizing:border-box}
  body{margin:0;background:#f8fafc;color:#0f172a;font-family:-apple-system,"PingFang SC","Microsoft YaHei",Segoe UI,sans-serif;line-height:1.6}
  .wrap{max-width:1040px;margin:0 auto;padding:34px 26px 70px}
  header{border-left:6px solid var(--accent);padding:6px 0 6px 16px;margin-bottom:26px}
  h1{font-size:26px;margin:0 0 6px}
  .meta{color:#64748b;font-size:13px}
  .tag{display:inline-block;background:var(--tint);color:var(--accent);border-radius:999px;padding:2px 10px;font-size:12px;margin-right:8px}
  h2{font-size:18px;margin:34px 0 12px;padding-left:10px;border-left:4px solid var(--accent)}
  .sec{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:18px}
  .empty{color:#94a3b8;font-size:14px;margin:8px 0}
  .hint{color:#64748b;font-size:12.5px;margin-top:8px}
  /* 时间轴 */
  .tl{list-style:none;margin:0;padding:0}
  .tl-item{display:grid;grid-template-columns:120px 1fr 30px;gap:14px;padding:12px 0;border-bottom:1px dashed #e2e8f0}
  .tl-item:last-child{border-bottom:0}
  .tl-date{font-weight:600;color:var(--accent);font-size:13.5px}
  .tl-fact{font-size:14.5px}
  .tl-meta{color:#64748b;font-size:12.5px;margin-top:3px}
  .ev{display:inline-block;background:#eef2f7;border-radius:5px;padding:0 5px;margin-right:3px;font-size:12px}
  .sig-red .tl-fact{font-weight:600}
  .sig-red{background:linear-gradient(90deg,rgba(239,68,68,.06),transparent)}
  .sig-yellow{background:linear-gradient(90deg,rgba(245,158,11,.06),transparent)}
  .tl-sig{font-size:14px;text-align:center}
  /* 图 */
  .rel{width:100%;height:auto;background:#fff;border-radius:10px}
  .node-bg{fill:#fff;stroke-width:2}
  .node-name{font-size:13px;font-weight:600;fill:#0f172a}
  .node-role{font-size:11px}
  .edge line{stroke:#94a3b8;stroke-width:1.6}
  .edge-bg{fill:#f8fafc;stroke:#e2e8f0}
  .edge-label{font-size:11.5px;fill:#475569}
  /* 表 */
  table.m{width:100%;border-collapse:collapse;font-size:13.5px}
  table.m th,table.m td{border:1px solid #e2e8f0;padding:8px 10px;text-align:left;vertical-align:top}
  table.m th{background:#f8fafc;font-size:12.5px;color:#475569;font-weight:600}
  table.m td.yes{text-align:center;color:#16a34a;font-weight:700;background:#f0fdf4}
  table.m td.no{text-align:center;color:#cbd5e1}
  table.m td.pt{font-weight:600}
  .gaps{margin:6px 0 0 18px;color:#475569;font-size:13.5px}
  footer{margin-top:36px;color:#94a3b8;font-size:12px;border-top:1px solid #e2e8f0;padding-top:12px}
  .badge{position:fixed;right:16px;bottom:14px;opacity:.9}
  .badge img{height:20px;display:block}
  @media print{body{background:#fff}.sec{break-inside:avoid;border-color:#ddd}.badge{position:fixed}@page{margin:14mm}}
</style></head><body><div class="wrap">
<header>
  <div class="meta"><span class="tag">${ESC(side.label)}</span>${d.caseNo ? '案号：' + ESC(d.caseNo) : ''}</div>
  <h1>${ESC(d.title)}</h1>
  ${d.summary ? `<div class="meta">${ESC(d.summary)}</div>` : ''}
</header>
<section class="sec"><h2>一、时间轴</h2>${timeline(d)}</section>
<section class="sec"><h2>二、法律关系</h2>${relations(d)}</section>
<section class="sec"><h2>三、证据矩阵</h2>${evidenceMatrix(d)}</section>
<section class="sec"><h2>四、争点对照</h2>${issues(d)}</section>
${gaps(d)}
<footer>生成于 ${stamp} · 本图由深鲸诉讼可视化根据输入材料整理，不构成法律意见；提交前须由承办律师核对原始材料。</footer>
</div>
<a class="badge" href="https://deepwhale.org.cn" target="_blank" rel="noopener"><img src="https://deepwhale.org.cn/assets/dwh-badge-121.png" alt="powered by dwh"></a>
</body></html>`;
}
