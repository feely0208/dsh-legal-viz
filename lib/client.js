/**
 * 深鲸诉讼可视化 · 面板 v3
 * 默认是表单：律师直接填，不用写 JSON。高级用户才切到 JSON / 表格导入。
 */
window.__ModuleLoader__.load({
  id: '@deepwhale-cn/dsh-legal-viz',
  factory: (require) => {
    var module = { exports: {} }; var exports = module.exports;
    const react = require('react'); const h = react.createElement;
    const SLOT_ICON = 'sidebar.panellist'; const SLOT_MAIN = 'main'; const PANEL_ID = 'legal-viz';
    const API = '/dsh-legal-viz/api'; const VERSION = '0.3.1';
    const 版本 = VERSION;
    const BADGE = 'data:image/png;base64,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';
    const SAMPLE = {
      title: '张某诉李某民间借贷纠纷', caseNo: '（2026）浙0302民初1234号', side: 'plaintiff', court: '', hearingDate: '',
      summary: '出借 20 万元到期未还，被告抗辩系赠与。演示数据。',
      parties: [{ id: 'p1', name: '张某', role: '原告' }, { id: 'p2', name: '李某', role: '被告' }],
      relations: [{ from: 'p1', to: 'p2', label: '民间借贷' }],
      events: [
        { date: '2024-05-01', actor: '李某', fact: '向张某借款 20 万元，出具借条', evidence: ['E1'], significance: '🔴', note: '' },
        { date: '2024-05-02', actor: '张某', fact: '转账 15 万元；另称现金交付 5 万元', evidence: ['E2'], significance: '🔴', note: '现金 5 万无凭证' },
        { date: '2025-05-01', actor: '李某', fact: '借款到期未还', evidence: ['E1'], significance: '🟡', note: '' },
      ],
      facts: [{ id: 'F1', text: '借贷合意' }, { id: 'F2', text: '款项已交付 20 万' }, { id: 'F3', text: '到期未还' }],
      evidence: [
        { id: 'E1', name: '借条', proves: ['F1', 'F3'], status: '已取得' },
        { id: 'E2', name: '银行转账凭证', proves: ['F2'], status: '已取得' },
        { id: 'E3', name: '微信聊天记录', proves: ['F1', 'F3'], status: '已取得' },
      ],
      issues: [{ point: '是否存在借贷合意', ours: '借条 + 微信回复', theirs: '主张赠与', evidence: ['E1', 'E3'], tip: '固定借条形成过程' }],
      gaps: ['现金 5 万元缺少取现记录或见证人', '借条未写交付方式'],
    };
    const EMPTY = {
      title: '', caseNo: '', court: '', hearingDate: '', side: 'neutral', summary: '',
      parties: [], relations: [], events: [], facts: [], evidence: [], issues: [], gapsText: '',
    };
    const toData = (f) => ({
      title: f.title, caseNo: f.caseNo, court: f.court, hearingDate: f.hearingDate, side: f.side, summary: f.summary,
      parties: f.parties.map((p) => ({ id: p.id || p.name, name: p.name, role: p.role })),
      relations: f.relations,
      events: f.events.map((e) => ({ date: e.date, actor: e.actor, fact: e.fact, evidence: String(e.evidence || '').split(/[,，、\s]+/).filter(Boolean), significance: e.significance || '⚪', note: e.note || '' })),
      facts: f.facts.filter((x) => x.id || x.text), evidence: f.evidence.filter((x) => x.id || x.name),
      issues: f.issues.filter((x) => x.point), gaps: f.gapsText.split(/\r?\n/).map((x) => x.trim()).filter(Boolean),
    });
    const fromData = (d) => ({
      title: d.title || '', caseNo: d.caseNo || '', court: d.court || '', hearingDate: d.hearingDate || '',
      side: d.side || 'neutral', summary: d.summary || '',
      parties: (d.parties || []).map((p) => ({ id: p.id || '', name: p.name || '', role: p.role || '' })),
      relations: d.relations || [],
      events: (d.events || []).map((e) => ({ date: e.date || '', actor: e.actor || '', fact: e.fact || '', evidence: Array.isArray(e.evidence) ? e.evidence.join(',') : (e.evidence || ''), significance: e.significance || '⚪', note: e.note || '' })),
      facts: (d.facts || []).map((x) => ({ id: x.id || '', text: x.text || '' })),
      evidence: (d.evidence || []).map((x) => ({ id: x.id || '', name: x.name || '', proves: Array.isArray(x.proves) ? x.proves.join(',') : (x.proves || ''), status: x.status || '' })),
      issues: (d.issues || []).map((x) => ({ point: x.point || '', ours: x.ours || '', theirs: x.theirs || '', evidence: Array.isArray(x.evidence) ? x.evidence.join(',') : (x.evidence || ''), tip: x.tip || '' })),
      gapsText: (d.gaps || []).map((g) => typeof g === 'string' ? g : (g.text || '')).join('\n'),
    });
    // ── 内置渲染器（与服务端同源，保证面板预览始终是最新版，不依赖宿主重启）──
/**
 * 深鲸诉讼可视化 · 渲染器 v2（纯 Node，无第三方依赖）
 *
 * 输入：案件 JSON（schema 见 skills/legal-litigation-viz/SKILL.md）
 * 输出：单文件 HTML（内联 CSS/JS/SVG），可交互、可打印、离线可用。
 *
 * v2 相比 v1：
 *  - 左侧目录 + 顶部页签，五个视图（时间轴/关系图/证据矩阵/争点/缺口）
 *  - 时间轴按年分组、关键/有证据/无证据筛选、关键词搜索
 *  - 关系图曲线边、悬停高亮、缩放
 *  - 证据矩阵：事实覆盖率、零证据事实标红、首列吸附
 *  - 打印时自动展开全部视图
 */

const VZ_ESC = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const VZ_SIDE = {
  plaintiff: { label: '原告 / 申请人视角', accent: '#2563eb', tint: '#eff6ff', name: '原告' },
  defendant: { label: '被告 / 被申请人视角', accent: '#c2410c', tint: '#fff7ed', name: '被告' },
  neutral: { label: '中立梳理', accent: '#475569', tint: '#f8fafc', name: '中立' },
};

const VZ_SIG_MAP = { red: '🔴', yellow: '🟡', white: '⚪', '🔴': '🔴', '🟡': '🟡', '⚪': '⚪' };
const VZ_SIG_CLASS = { '🔴': 'sig-red', '🟡': 'sig-yellow', '⚪': 'sig-white' };
const VZ_KIND = {
  contract: { icon: '📄', label: '合同' }, payment: { icon: '💰', label: '款项' },
  court: { icon: '⚖️', label: '诉讼' }, notice: { icon: '✉️', label: '通知/催告' },
  injury: { icon: '🩺', label: '损害' }, other: { icon: '•', label: '其他' },
};

function vzNorm(data) {
  const d = data && typeof data === 'object' ? data : {};
  const arr = (x) => (Array.isArray(x) ? x : []);
  return {
    title: String(d.title || '案件梳理'),
    caseNo: String(d.caseNo || ''),
    court: String(d.court || ''),
    hearingDate: String(d.hearingDate || ''),
    side: VZ_SIDE[d.side] ? d.side : 'neutral',
    summary: String(d.summary || ''),
    parties: arr(d.parties),
    events: arr(d.events).filter((e) => e && (e.date || e.fact)),
    relations: arr(d.relations).filter((r) => r && r.from && r.to),
    facts: arr(d.facts),
    evidence: arr(d.evidence),
    issues: arr(d.issues),
    gaps: arr(d.gaps),
  };
}

function dateKey(e) {
  const s = String(e.date || '');
  const m = s.match(/(\d{4})[-年./]?(\d{1,2})?[-月./]?(\d{1,2})?/);
  if (!m) return '9999-99-99';
  return `${m[1]}-${String(m[2] || '99').padStart(2, '0')}-${String(m[3] || '99').padStart(2, '0')}`;
}

function coverage(d) {
  if (!d.facts.length) return null;
  const covered = d.facts.filter((f) => d.evidence.some((e) => (Array.isArray(e.proves) ? e.proves : []).includes(f.id)));
  return { covered: covered.length, total: d.facts.length, pct: Math.round((covered.length / d.facts.length) * 100) };
}

function stats(d) {
  const cov = coverage(d);
  const red = d.events.filter((e) => (VZ_SIG_MAP[e.significance] || VZ_SIG_MAP[e.sig]) === '🔴').length;
  const noEv = d.events.filter((e) => !(Array.isArray(e.evidence) ? e.evidence.length : e.evidence)).length;
  return [
    ['事件', d.events.length], ['关键事件', red], ['证据', d.evidence.length],
    ['待证事实', d.facts.length], ['争点', d.issues.length],
    ['事实覆盖', cov ? cov.pct + '%' : '—'], ['无证据事件', noEv],
  ];
}

function timeline(d) {
  const events = [...d.events].sort((a, b) => dateKey(a).localeCompare(dateKey(b)));
  if (!events.length) return `<div class="empty">还没有事件。events 里每条至少要有 date 和 fact。</div>`;
  const years = [...new Set(events.map((e) => String(e.date || '').slice(0, 4) || '时间待定'))];
  const body = years.map((y) => {
    const rows = events.filter((e) => (String(e.date || '').slice(0, 4) || '时间待定') === y).map((e) => {
      const sig = VZ_SIG_MAP[e.significance] || VZ_SIG_MAP[e.sig] || '⚪';
      const ev = Array.isArray(e.evidence) ? e.evidence : (e.evidence ? [e.evidence] : []);
      const kind = VZ_KIND[e.kind] || VZ_KIND.other;
      return `<li class="tl-item ${VZ_SIG_CLASS[sig] || 'sig-white'}" data-sig="${sig}" data-hasev="${ev.length ? 1 : 0}" data-text="${VZ_ESC((e.fact || '') + ' ' + (e.actor || '') + ' ' + ev.join(' '))}">
        <div class="tl-date">${VZ_ESC(e.date || '时间待定')}</div>
        <div class="tl-body">
          <div class="tl-fact"><span class="sig-badge" title="重要性">${sig}</span><span class="kind" title="${VZ_ESC(kind.label)}">${kind.icon}</span>${VZ_ESC(e.fact || '')}</div>
          <div class="tl-meta">${e.actor ? `<span class="who">${VZ_ESC(e.actor)}</span>` : ''}${ev.length ? ev.map((x) => `<span class="ev">${VZ_ESC(x)}</span>`).join('') : '<span class="noev">无证据</span>'}${e.note ? `<span class="note">${VZ_ESC(e.note)}</span>` : ''}</div>
        </div>
      </li>`;
    }).join('');
    return `<div class="tl-year" data-year="${VZ_ESC(y)}"><div class="tl-year-label">${VZ_ESC(y)}<span>${rows.split('tl-item').length - 1} 条</span></div><ol class="tl">${rows}</ol></div>`;
  }).join('');
  return `<div class="toolbar">
      <div class="chips" id="tl-chips">
        <button class="chip on" data-f="all">全部</button>
        <button class="chip" data-f="red">🔴 关键</button>
        <button class="chip" data-f="yellow">🟡 辅助</button>
        <button class="chip" data-f="ev">有证据</button>
        <button class="chip" data-f="noev">无证据</button>
      </div>
      <input class="search" id="tl-search" placeholder="搜事件/主体/证据编号…">
    </div>${body}<div class="empty" id="tl-empty" style="display:none">没有匹配的事件。</div>`;
}

function relations(d) {
  const nodes = [];
  const push = (id, label, role) => { if (id && !nodes.find((n) => n.id === id)) nodes.push({ id, label: label || id, role: role || '' }); };
  d.parties.forEach((p) => push(p.id || p.name, p.name || p.id, p.role));
  d.relations.forEach((r) => { push(r.from, r.fromLabel || r.from); push(r.to, r.toLabel || r.to); });
  if (!nodes.length) return `<div class="empty">还没有当事人或法律关系。至少给 parties 和 relations。</div>`;
  const W = 900;
  const H = nodes.length <= 2 ? 280 : Math.max(380, Math.min(560, 200 + nodes.length * 34));
  const cx = W / 2, cy = H / 2, rx = W / 2 - 180, ry = H / 2 - 100;
  const pos = {};
  if (nodes.length === 1) pos[nodes[0].id] = { x: cx, y: cy };
  else if (nodes.length === 2) { pos[nodes[0].id] = { x: 230, y: cy }; pos[nodes[1].id] = { x: W - 230, y: cy }; }
  else nodes.forEach((n, i) => { const a = (Math.PI * 2 * i) / nodes.length - Math.PI / 2; pos[n.id] = { x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) }; });

  const colorOf = (role) => /原告|申请|债权|受害/.test(role) ? '#2563eb' : /被告|被申请|债务|侵权/.test(role) ? '#c2410c' : '#475569';
  const edges = d.relations.map((r, i) => {
    const a = pos[r.from], b = pos[r.to]; if (!a || !b) return '';
    const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
    const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
    const qx = mx + (dy / len) * 26, qy = my - (dx / len) * 26;
    const label = VZ_ESC(r.label || '');
    const w = Math.max(76, label.length * 14);
    return `<g class="edge" data-from="${VZ_ESC(r.from)}" data-to="${VZ_ESC(r.to)}">
      <path d="M${a.x} ${a.y} Q${qx} ${qy} ${b.x} ${b.y}" marker-end="url(#arrow)"/>
      <rect x="${qx - w / 2}" y="${qy - 14}" width="${w}" height="26" rx="7" class="edge-bg"/>
      <text x="${qx}" y="${qy + 4}" text-anchor="middle" class="edge-label">${label}</text></g>`;
  }).join('');
  const circles = nodes.map((n) => {
    const p = pos[n.id]; const w = Math.max(104, n.label.length * 15 + 30);
    return `<g class="node" data-id="${VZ_ESC(n.id)}"><rect x="${p.x - w / 2}" y="${p.y - 24}" width="${w}" height="48" rx="12" class="node-bg" stroke="${colorOf(n.role)}"/>
      <text x="${p.x}" y="${p.y - 3}" text-anchor="middle" class="node-name">${VZ_ESC(n.label)}</text>
      <text x="${p.x}" y="${p.y + 15}" text-anchor="middle" class="node-role" fill="${colorOf(n.role)}">${VZ_ESC(n.role)}</text></g>`;
  }).join('');
  return `<div class="graph-toolbar"><button class="mini" data-zoom="in">放大</button><button class="mini" data-zoom="out">缩小</button><button class="mini" data-zoom="reset">复位</button><span class="hint">悬停节点可高亮相关关系；滚轮也可缩放（按住 Ctrl）。</span></div>
    <div class="graph-wrap"><svg viewBox="0 0 ${W} ${H}" class="rel" id="rel-svg" role="img" aria-label="法律关系图">
      <defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#94a3b8"/></marker></defs>
      ${edges}${circles}</svg></div>
    <div class="legend"><span><i style="background:#2563eb"></i>原告/债权/受害</span><span><i style="background:#c2410c"></i>被告/债务/侵权</span><span><i style="background:#475569"></i>其他</span></div>`;
}

function evidenceMatrix(d) {
  if (!d.evidence.length) return `<div class="empty">还没有证据。evidence 里每条给 id、name、proves（对应 facts 的 id）。</div>`;
  const facts = d.facts;
  if (!facts.length) {
    return `<table class="m"><thead><tr><th>编号</th><th>证据</th><th>证明目的</th><th>状态</th></tr></thead><tbody>${d.evidence.map((e) => `<tr><td>${VZ_ESC(e.id || '')}</td><td>${VZ_ESC(e.name || '')}</td><td>${VZ_ESC(e.purpose || '')}</td><td>${VZ_ESC(e.status || '待补')}</td></tr>`).join('')}</tbody></table>`;
  }
  const count = {}; facts.forEach((f) => { count[f.id] = d.evidence.filter((e) => (Array.isArray(e.proves) ? e.proves : []).includes(f.id)).length; });
  const head = facts.map((f) => `<th class="${count[f.id] ? '' : 'gap-col'}" title="${VZ_ESC(f.text || f.id)}"><span class="fid">${VZ_ESC(f.id || '')}</span><span class="ftext">${VZ_ESC(f.text || '')}</span><span class="fcount ${count[f.id] ? '' : 'zero'}">${count[f.id] ? count[f.id] + ' 份' : '0 份'}</span></th>`).join('');
  const rows = d.evidence.map((e) => {
    const proves = new Set(Array.isArray(e.proves) ? e.proves : []);
    const cells = facts.map((f) => proves.has(f.id) ? '<td class="yes">✓</td>' : '<td class="no">—</td>').join('');
    return `<tr><td class="sticky">${VZ_ESC(e.id || '')}</td><td class="sticky2">${VZ_ESC(e.name || '')}</td>${cells}<td>${VZ_ESC(e.status || '待补')}</td></tr>`;
  }).join('');
  const cov = coverage(d);
  return `<div class="cov"><div class="cov-bar"><i style="width:${cov.pct}%"></i></div><span>事实覆盖 ${cov.covered}/${cov.total}（${cov.pct}%）</span></div>
    <div class="table-wrap"><table class="m matrix"><thead><tr><th class="sticky">证据</th><th class="sticky2">名称</th>${head}<th>状态</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="hint">✓ = 该证据用于证明该事实；— = 未对应。红色列 = 还没有任何证据支撑的事实（缺口）。</p>`;
}

function issues(d) {
  if (!d.issues.length) return `<div class="empty">还没有争点。issues 里每条给 point、ours、theirs、evidence。</div>`;
  return `<div class="issues">${d.issues.map((x, i) => {
    const ev = Array.isArray(x.evidence) ? x.evidence : (x.evidence ? [x.evidence] : []);
    return `<article class="issue">
      <div class="issue-h"><span class="idx">${i + 1}</span><h3>${VZ_ESC(x.point || '')}</h3>${x.status ? `<span class="pill">${VZ_ESC(x.status)}</span>` : ''}</div>
      <div class="vs"><div class="side ours"><b>我方</b><p>${VZ_ESC(x.ours || '—')}</p></div><div class="side theirs"><b>对方</b><p>${VZ_ESC(x.theirs || '—')}</p></div></div>
      <div class="issue-f">${ev.length ? '对应证据：' + ev.map((e) => `<span class="ev">${VZ_ESC(e)}</span>`).join('') : '<span class="noev">未绑定证据</span>'}${x.tip ? `<div class="tip">准备提示：${VZ_ESC(x.tip)}</div>` : ''}</div>
    </article>`;
  }).join('')}</div>`;
}

function gaps(d) {
  if (!d.gaps.length) return `<div class="empty">没有记录缺口。如果材料确实完整，可以留空；否则这正是最该写的一节。</div>`;
  return `<ul class="gaps">${d.gaps.map((g) => {
    const t = typeof g === 'string' ? g : (g.text || '');
    const owner = typeof g === 'object' && g.owner ? `<span class="gap-meta">负责：${VZ_ESC(g.owner)}</span>` : '';
    const due = typeof g === 'object' && g.due ? `<span class="gap-meta">截止：${VZ_ESC(g.due)}</span>` : '';
    return `<li><span class="gap-dot">!</span><div><p>${VZ_ESC(t)}</p>${owner}${due}</div></li>`;
  }).join('')}</ul>`;
}

function normalize(data) { return vzNorm(data); }

function renderHtml(input) {
  const d = vzNorm(input);
  const side = VZ_SIDE[d.side];
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const st = stats(d);
  return `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${VZ_ESC(d.title)} · 诉讼可视化</title>
<style>
  :root{--accent:${side.accent};--tint:${side.tint};--ink:#0f172a;--muted:#64748b;--line:#e2e8f0;--bg:#f5f7fb;--card:#fff}
  *{box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{margin:0;background:var(--bg);color:var(--ink);font-family:-apple-system,"PingFang SC","Microsoft YaHei",Segoe UI,sans-serif;line-height:1.65;font-size:15px}
  a{color:inherit}
  .layout{display:grid;grid-template-columns:210px minmax(0,1fr);max-width:1280px;margin:0 auto;gap:0}
  /* 侧栏 */
  aside{position:sticky;top:0;height:100vh;padding:26px 14px 26px 22px;border-right:1px solid var(--line);background:rgba(255,255,255,.75);backdrop-filter:blur(8px);display:flex;flex-direction:column;gap:18px}
  .brand{display:flex;align-items:center;gap:8px;font-weight:700;font-size:15px;color:var(--accent)}
  .brand i{width:9px;height:9px;border-radius:50%;background:var(--accent);display:inline-block}
  .nav{display:flex;flex-direction:column;gap:4px}
  .nav button{display:flex;align-items:center;gap:9px;border:0;background:transparent;text-align:left;padding:9px 10px;border-radius:9px;font-size:13.5px;color:var(--muted);cursor:pointer}
  .nav button .n{width:18px;height:18px;border-radius:5px;background:#eef2f7;display:grid;place-items:center;font-size:11px;color:#64748b}
  .nav button:hover{background:#eef2f7;color:var(--ink)}
  .nav button.on{background:var(--tint);color:var(--accent);font-weight:600}
  .nav button.on .n{background:var(--accent);color:#fff}
  .side-foot{margin-top:auto;font-size:11.5px;color:#94a3b8;line-height:1.7}
  /* 主体 */
  main{padding:34px 40px 80px;min-width:0}
  header.hero{background:var(--card);border:1px solid var(--line);border-radius:18px;padding:24px 26px;margin-bottom:18px;border-top:4px solid var(--accent)}
  .chip-side{display:inline-block;background:var(--tint);color:var(--accent);border-radius:999px;padding:2px 11px;font-size:12px;font-weight:600;margin-right:8px}
  .meta{color:var(--muted);font-size:12.5px}
  h1{font-size:27px;margin:8px 0 6px;letter-spacing:.2px}
  .summary{color:#334155;font-size:14px;margin-top:8px}
  .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:10px;margin-top:18px}
  .stat{background:var(--bg);border:1px solid var(--line);border-radius:11px;padding:9px 12px}
  .stat b{display:block;font-size:19px;color:var(--accent)}
  .stat span{font-size:11.5px;color:var(--muted)}
  /* 视图 */
  .panel{display:none}.panel.on{display:block}
  .card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 22px;margin-bottom:16px}
  .card h2{font-size:17px;margin:0 0 4px;display:flex;align-items:center;gap:8px}
  .card h2 small{font-weight:400;color:var(--muted);font-size:12px}
  .sub{color:var(--muted);font-size:12.5px;margin:0 0 14px}
  .empty{color:#94a3b8;font-size:14px;padding:16px 0}
  .hint{color:#64748b;font-size:12.5px;margin:10px 0 0}
  /* 工具条 */
  .toolbar{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap;margin-bottom:14px}
  .chips{display:flex;gap:7px;flex-wrap:wrap}
  .chip{border:1px solid var(--line);background:#fff;color:var(--muted);font-size:12.5px;padding:6px 12px;border-radius:999px;cursor:pointer}
  .chip.on{background:var(--accent);border-color:var(--accent);color:#fff}
  .search{border:1px solid var(--line);border-radius:9px;padding:7px 12px;font-size:13px;min-width:220px;outline:none}
  .search:focus{border-color:var(--accent)}
  /* 时间轴 */
  .tl-year{margin-bottom:20px}
  .tl-year-label{font-size:13px;font-weight:700;color:var(--accent);display:flex;gap:8px;align-items:baseline;margin:0 0 8px;padding-left:4px}
  .tl-year-label span{font-weight:400;color:var(--muted);font-size:11.5px}
  .tl{list-style:none;margin:0;padding:0;position:relative}
  .tl:before{content:"";position:absolute;left:118px;top:8px;bottom:8px;width:2px;background:var(--line)}
  .tl-item{display:grid;grid-template-columns:104px 1fr;gap:30px;padding:9px 0;position:relative;border-radius:10px}
  .tl-item:hover{background:rgba(37,99,235,.04)}
  .tl-date{font-weight:600;font-size:12.5px;color:#334155;position:relative;text-align:right;padding-right:20px;align-self:center}
  .tl-date:after{content:"";position:absolute;right:-5px;top:50%;transform:translateY(-50%);width:10px;height:10px;border-radius:50%;background:#cbd5e1;box-shadow:0 0 0 3px #fff;z-index:1}
  .sig-red .tl-date:after{background:#ef4444}.sig-yellow .tl-date:after{background:#f59e0b}.sig-white .tl-date:after{background:#94a3b8}
  .tl-body{padding-left:10px}
  .tl-fact{font-size:14.5px}
  .sig-red .tl-fact{font-weight:600}
  .tl-meta{color:var(--muted);font-size:12px;margin-top:4px;display:flex;gap:6px;flex-wrap:wrap;align-items:center}
  .kind{opacity:.75;margin-right:6px}.sig-badge{margin-right:5px;font-size:12px}
  .who{background:#eef2f7;border-radius:5px;padding:0 6px}
  .ev{display:inline-block;background:#eef2f7;border-radius:5px;padding:0 6px;font-size:12px}
  .noev{color:#dc2626;font-size:12px}
  .note{color:#94a3b8}
  .tl-sig{font-size:13px}
  /* 关系图 */
  .graph-toolbar{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:10px}
  .mini{border:1px solid var(--line);background:#fff;border-radius:8px;padding:5px 12px;font-size:12.5px;cursor:pointer;color:#475569}
  .mini:hover{border-color:var(--accent);color:var(--accent)}
  .graph-wrap{overflow:hidden;border:1px solid var(--line);border-radius:12px;background:linear-gradient(180deg,#fbfdff,#f4f8ff)}
  .rel{width:100%;height:auto;display:block;transition:transform .18s ease}
  .node-bg{fill:#fff;stroke-width:2.2;filter:drop-shadow(0 2px 3px rgba(15,23,42,.06))}
  .node-name{font-size:13.5px;font-weight:700;fill:#0f172a}
  .node-role{font-size:11.5px}
  .edge path{fill:none;stroke:#94a3b8;stroke-width:1.6}
  .edge-bg{fill:#fff;stroke:var(--line)}
  .edge-label{font-size:11.5px;fill:#475569}
  .node.dim,.edge.dim{opacity:.18}
  .legend{display:flex;gap:18px;color:var(--muted);font-size:12px;margin-top:10px;flex-wrap:wrap}
  .legend i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:5px}
  /* 表 */
  .table-wrap{overflow:auto;border:1px solid var(--line);border-radius:12px;max-height:70vh}
  table.m{width:100%;border-collapse:separate;border-spacing:0;font-size:13px}
  table.m th,table.m td{border-bottom:1px solid var(--line);padding:9px 10px;text-align:left;vertical-align:top}
  table.m th{background:#f8fafc;font-size:12px;color:#475569;font-weight:600;position:sticky;top:0;z-index:2}
  table.m th .fid{display:block;font-weight:700;color:#334155}
  table.m th .ftext{display:block;font-weight:400;color:#64748b;font-size:11px;max-width:150px;white-space:normal}
  table.m th .fcount{display:inline-block;margin-top:4px;font-size:10.5px;background:#eef2f7;border-radius:999px;padding:0 6px;color:#64748b}
  table.m th .fcount.zero{background:#fee2e2;color:#b91c1c}
  table.m th.gap-col{background:#fff5f5}
  table.m td.yes{text-align:center;color:#16a34a;font-weight:700;background:#f0fdf4}
  table.m td.no{text-align:center;color:#e2e8f0}
  table.m td.sticky,table.m th.sticky{position:sticky;left:0;background:#fff;z-index:3}
  table.m th.sticky{background:#f8fafc;z-index:4}
  table.m td.sticky2,table.m th.sticky2{position:sticky;left:52px;background:#fff;z-index:3;min-width:120px}
  table.m th.sticky2{background:#f8fafc;z-index:4}
  .cov{display:flex;align-items:center;gap:12px;margin-bottom:12px;font-size:12.5px;color:var(--muted)}
  .cov-bar{flex:1;height:8px;background:#eef2f7;border-radius:99px;overflow:hidden;max-width:320px}
  .cov-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),#22d3ee)}
  /* 争点 */
  .issues{display:grid;gap:12px}
  .issue{border:1px solid var(--line);border-radius:14px;padding:16px 18px;background:#fff}
  .issue-h{display:flex;align-items:center;gap:9px;margin-bottom:10px}
  .issue-h h3{margin:0;font-size:15px}
  .issue-h .idx{width:22px;height:22px;border-radius:7px;background:var(--tint);color:var(--accent);display:grid;place-items:center;font-size:12px;font-weight:700}
  .pill{font-size:11px;border:1px solid var(--line);border-radius:999px;padding:1px 9px;color:var(--muted)}
  .vs{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  .side{border-radius:10px;padding:10px 12px;font-size:13px}
  .side b{font-size:11.5px;letter-spacing:.05em}
  .side p{margin:4px 0 0;color:#334155}
  .ours{background:#eff6ff}.theirs{background:#fff7ed}
  .ours b{color:#2563eb}.theirs b{color:#c2410c}
  .issue-f{margin-top:10px;font-size:12.5px;color:var(--muted)}
  .tip{margin-top:6px;color:#475569}
  /* 缺口 */
  .gaps{list-style:none;margin:0;padding:0;display:grid;gap:9px}
  .gaps li{display:flex;gap:11px;background:#fff7ed;border:1px solid #fed7aa;border-radius:11px;padding:11px 14px;font-size:13.5px}
  .gap-dot{width:20px;height:20px;border-radius:50%;background:#fb923c;color:#fff;font-weight:700;display:grid;place-items:center;font-size:12px;flex:none}
  .gaps p{margin:0}
  .gap-meta{font-size:11.5px;color:#9a3412;margin-right:10px}
  footer{margin-top:26px;color:#94a3b8;font-size:12px;border-top:1px solid var(--line);padding-top:14px}
  .print-btn{border:1px solid var(--line);background:#fff;border-radius:9px;padding:7px 14px;font-size:12.5px;cursor:pointer;color:#475569}
  .print-btn:hover{border-color:var(--accent);color:var(--accent)}
  .topbar{display:flex;justify-content:flex-end;gap:8px;margin-bottom:10px}
  @media (max-width:900px){
    .layout{grid-template-columns:1fr}
    aside{position:static;height:auto;border-right:0;border-bottom:1px solid var(--line);flex-direction:row;align-items:center;flex-wrap:wrap;padding:12px 16px}
    .nav{flex-direction:row;overflow:auto;flex:1}
    .nav button{white-space:nowrap}
    .side-foot{display:none}
    main{padding:18px 16px 60px}
    .tl-item{grid-template-columns:84px 1fr;gap:16px}
    .tl:before{left:96px}
    .tl-date{padding-right:16px;font-size:11.5px}
    .vs{grid-template-columns:1fr}
  }
  @media print{
    aside,.topbar,.toolbar,.graph-toolbar{display:none!important}
    .layout{display:block;max-width:none}
    main{padding:0}
    .panel{display:block!important;break-inside:avoid}
    .card{box-shadow:none;break-inside:avoid}
    .table-wrap{max-height:none;overflow:visible}
    body{background:#fff}
    @page{margin:12mm}
  }
</style></head><body><div class="layout">
<aside>
  <div class="brand"><i></i>诉讼可视化</div>
  <nav class="nav" id="nav">
    <button class="on" data-tab="timeline"><span class="n">1</span>时间轴</button>
    <button data-tab="relations"><span class="n">2</span>法律关系</button>
    <button data-tab="evidence"><span class="n">3</span>证据矩阵</button>
    <button data-tab="issues"><span class="n">4</span>争点对照</button>
    <button data-tab="gaps"><span class="n">5</span>证据缺口</button>
  </nav>
  <div class="side-foot">只用你给的材料，不补事实。<br>打印时自动展开全部视图。</div>
</aside>
<main>
  <div class="topbar"><button class="print-btn" onclick="window.print()">打印 / 导出 PDF</button></div>
  <header class="hero">
    <div class="meta"><span class="chip-side">${VZ_ESC(side.label)}</span>${d.caseNo ? '案号：' + VZ_ESC(d.caseNo) : ''}${d.court ? ' · ' + VZ_ESC(d.court) : ''}${d.hearingDate ? ' · 开庭：' + VZ_ESC(d.hearingDate) : ''}</div>
    <h1>${VZ_ESC(d.title)}</h1>
    ${d.summary ? `<div class="summary">${VZ_ESC(d.summary)}</div>` : ''}
    <div class="stats">${st.map(([k, v]) => `<div class="stat"><b>${VZ_ESC(v)}</b><span>${VZ_ESC(k)}</span></div>`).join('')}</div>
  </header>
  <section class="panel on" id="panel-timeline"><div class="card"><h2>时间轴 <small>按日期排序，红色为关键事件</small></h2>${timeline(d)}</div></section>
  <section class="panel" id="panel-relations"><div class="card"><h2>法律关系 <small>颜色区分立场，箭头表示关系指向</small></h2>${relations(d)}</div></section>
  <section class="panel" id="panel-evidence"><div class="card"><h2>证据矩阵 <small>每份证据能证明哪个待证事实</small></h2>${evidenceMatrix(d)}</div></section>
  <section class="panel" id="panel-issues"><div class="card"><h2>争点对照 <small>主张 vs 抗辩 vs 证据</small></h2>${issues(d)}</div></section>
  <section class="panel" id="panel-gaps"><div class="card"><h2>证据缺口 <small>开庭前最该补的东西</small></h2>${gaps(d)}</div></section>
  <footer>生成于 ${stamp} · 深鲸诉讼可视化 · 本图根据输入材料整理，不构成法律意见；提交前须由承办律师核对原始材料。</footer>
</main></div>
<script>
(function(){
  var nav=document.getElementById('nav');
  function show(t){document.querySelectorAll('.panel').forEach(function(p){p.classList.toggle('on',p.id==='panel-'+t)});
    nav.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',b.getAttribute('data-tab')===t)});
    if(history.replaceState)history.replaceState(null,'','#'+t);}
  nav.addEventListener('click',function(e){var b=e.target.closest('button');if(b)show(b.getAttribute('data-tab'))});
  var h=location.hash.slice(1); if(h&&document.getElementById('panel-'+h))show(h);

  // 时间轴筛选
  var chips=document.getElementById('tl-chips'), search=document.getElementById('tl-search');
  if(chips){
    var filter='all';
    function apply(){
      var q=(search&&search.value||'').trim().toLowerCase(), n=0;
      document.querySelectorAll('.tl-item').forEach(function(li){
        var sig=li.getAttribute('data-sig'), has=li.getAttribute('data-hasev')==='1', txt=li.getAttribute('data-text').toLowerCase();
        var ok=(filter==='all')||(filter==='red'&&sig==='🔴')||(filter==='yellow'&&sig==='🟡')||(filter==='ev'&&has)||(filter==='noev'&&!has);
        if(q) ok=ok&&txt.indexOf(q)>=0;
        li.style.display=ok?'':'none'; if(ok)n++;
      });
      document.querySelectorAll('.tl-year').forEach(function(y){
        var vis=y.querySelectorAll('.tl-item:not([style*="display: none"])').length;
        y.style.display=vis?'':'none';
      });
      var em=document.getElementById('tl-empty'); if(em)em.style.display=n?'none':'';
    }
    chips.addEventListener('click',function(e){var b=e.target.closest('.chip');if(!b)return;
      chips.querySelectorAll('.chip').forEach(function(x){x.classList.remove('on')});b.classList.add('on');filter=b.getAttribute('data-f');apply();});
    if(search)search.addEventListener('input',apply);
  }

  // 关系图悬停 + 缩放
  var svg=document.getElementById('rel-svg');
  if(svg){
    var nodes=svg.querySelectorAll('.node'), edges=svg.querySelectorAll('.edge');
    nodes.forEach(function(n){
      n.addEventListener('mouseenter',function(){
        var id=n.getAttribute('data-id');
        nodes.forEach(function(x){x.classList.toggle('dim',x!==n&&x.getAttribute('data-id')!==id)});
        edges.forEach(function(e){var f=e.getAttribute('data-from'),t=e.getAttribute('data-to');e.classList.toggle('dim',f!==id&&t!==id)});
      });
      n.addEventListener('mouseleave',function(){nodes.forEach(function(x){x.classList.remove('dim')});edges.forEach(function(e){e.classList.remove('dim')})});
    });
    var scale=1, wrap=svg.parentElement;
    function set(z){scale=Math.max(.6,Math.min(2.5,z));svg.style.transform='scale('+scale+')';svg.style.transformOrigin='center top';}
    document.querySelectorAll('[data-zoom]').forEach(function(b){b.addEventListener('click',function(){
      var z=b.getAttribute('data-zoom'); if(z==='in')set(scale+.15); else if(z==='out')set(scale-.15); else set(1);});});
    wrap.addEventListener('wheel',function(e){if(!e.ctrlKey)return;e.preventDefault();set(scale+(e.deltaY<0?.08:-.08));},{passive:false});
  }
})();
</script>
</body></html>`;
}

    const Ico = () => h('svg', { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }, [
      h('path', { key: 'a', d: 'M4 19V5M4 19h16' }), h('circle', { key: 'b', cx: 8, cy: 15, r: 1.6 }),
      h('circle', { key: 'c', cx: 13, cy: 10, r: 1.6 }), h('circle', { key: 'd', cx: 18, cy: 13, r: 1.6 }),
      h('path', { key: 'e', d: 'M8 15l5-5 5 3' }),
    ]);
    const CSS = `
      .vz-root{position:relative;display:flex;flex-direction:column;gap:12px;padding:18px 22px 20px;height:100%;overflow:auto}
      .vz-body{display:grid;grid-template-columns:minmax(340px,46%) minmax(0,1fr);gap:14px;align-items:start}
      .vz-edit{display:flex;flex-direction:column;gap:10px;min-width:0}
      .vz-preview{position:sticky;top:0;display:flex;flex-direction:column;gap:8px;min-width:0}
      .vz-pmsg{font-size:12.5px;color:var(--dsw-alias-text-secondary,#8b98a8)}
      .vz-pmsg.err{color:#e0645a}
      .vz-placeholder{display:flex;align-items:center;justify-content:center;min-height:420px;border:1px dashed var(--dsw-alias-border-l1,rgba(0,0,0,.15));border-radius:10px;color:#94a3b8;font-size:13px;background:#fff}
      @media (max-width:820px){.vz-body{grid-template-columns:1fr}.vz-preview{position:static}}
      .vz-head{display:flex;align-items:center;gap:10px}
      .vz-title{font-size:16px;font-weight:600}
      .vz-sub{color:var(--dsw-alias-text-secondary,#8b98a8);font-size:12px}
      .vz-ver{margin-left:8px;font-size:11px;border:1px solid rgba(106,13,173,.35);color:#6a0dad;border-radius:6px;padding:0 5px}
      .vz-tabs{display:flex;gap:6px;border-bottom:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.1));padding-bottom:8px}
      .vz-tab{border:0;background:transparent;padding:6px 12px;border-radius:7px;font-size:13px;color:var(--dsw-alias-text-secondary,#8b98a8);cursor:pointer}
      .vz-tab.on{background:#f3e8ff;color:#6a0dad;font-weight:600}
      .vz-card{border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.1));border-left:3px solid #8b5cf6;border-radius:12px;background:var(--dsw-alias-bg-layer-1,#faf8ff);padding:14px;display:flex;flex-direction:column;gap:10px}
      .vz-sec{border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.08));border-radius:10px;padding:12px;display:flex;flex-direction:column;gap:8px;background:#fff}
      .vz-sec h4{margin:0;font-size:13px;color:#6a0dad;display:flex;justify-content:space-between;align-items:center}
      .vz-fgrid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px}
      .vz-field{display:flex;flex-direction:column;gap:3px;font-size:12px;color:var(--dsw-alias-text-secondary,#8b98a8)}
      .vz-field input,.vz-field select,.vz-field textarea{padding:6px 8px;border-radius:7px;border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.14));background:#fff;color:inherit;font-size:12.5px;font-family:inherit}
      .vz-field textarea{min-height:54px;resize:vertical}
      .vz-row{display:flex;gap:6px;align-items:flex-end}
      .vz-event{display:flex;flex-direction:column;gap:6px;padding:8px;border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.08));border-radius:9px;background:#fcfaff}
      .vz-event + .vz-event{margin-top:6px}
      .vz-row .vz-field{flex:1;min-width:0}
      .vz-del{border:1px solid #fecaca;color:#b91c1c;background:#fff;border-radius:7px;padding:5px 8px;font-size:12px;cursor:pointer;flex:none}
      .vz-add{align-self:flex-start;border:1px dashed #c4b5fd;color:#6a0dad;background:#faf5ff;border-radius:7px;padding:5px 10px;font-size:12px;cursor:pointer}
      .vz-btn{padding:7px 14px;border-radius:8px;border:1px solid transparent;background:linear-gradient(96deg,#8b5cf6,#c4b5fd);color:#fff;font-size:13px;cursor:pointer}
      .vz-btn.ghost{background:transparent;color:#6a0dad;border-color:#8b5cf6}
      .vz-btn[disabled]{opacity:.55;cursor:default}
      .vz-actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
      .vz-msg{font-size:12.5px;color:var(--dsw-alias-text-secondary,#8b98a8)}
      .vz-msg.err{color:#e0645a}
      .vz-frame{width:100%;height:clamp(420px,62vh,720px);border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.12));border-radius:10px;background:#fff}
      .vz-tip{font-size:12px;color:var(--dsw-alias-text-secondary,#8b98a8)}
      .vz-area{width:100%;min-height:220px;font-family:ui-monospace,Menlo,monospace;font-size:12px;line-height:1.55;padding:10px;border-radius:8px;border:1px solid var(--dsw-alias-border-l1,rgba(0,0,0,.12));background:#fff;color:inherit}
      .vz-badge{display:flex;justify-content:flex-end;margin-top:10px;opacity:.9}
      .vz-badge img{width:121px;height:20px;display:block}
      .vz-mini{font-size:11.5px;color:var(--dsw-alias-text-secondary,#8b98a8)}
    `;
    function Panel() {
      const [tab, setTab] = react.useState('form');
      const [form, setForm] = react.useState(() => fromData(SAMPLE));
      const [jsonText, setJsonText] = react.useState(() => JSON.stringify(SAMPLE, null, 2));
      const [tableText, setTableText] = react.useState('');
      const [html, setHtml] = react.useState('');
      const [msg, setMsg] = react.useState('');
      const [err, setErr] = react.useState(false);
      const [busy, setBusy] = react.useState(false);

      const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
      const rowSet = (k, i, key, v) => setForm((f) => ({ ...f, [k]: f[k].map((r, j) => j === i ? { ...r, [key]: v } : r) }));
      const rowAdd = (k, tpl) => setForm((f) => ({ ...f, [k]: [...f[k], tpl] }));
      const rowDel = (k, i) => setForm((f) => ({ ...f, [k]: f[k].filter((_, j) => j !== i) }));

      const preview = () => {
        setErr(false); setMsg('');
        try {
          const data = toData(form);
          if (!data.events.length && !data.evidence.length) throw new Error('至少填一条事件或一份证据，否则画不出东西');
          setHtml(renderHtml(data));
          setMsg('预览已更新：时间轴 ' + data.events.length + ' 条 · 证据 ' + data.evidence.length + ' 项 · 争点 ' + data.issues.length + ' 个');
        } catch (e) { setErr(true); setMsg(e.message || String(e)); }
      };
      const save = () => {
        setErr(false);
        try {
          const data = toData(form);
          if (!data.events.length && !data.evidence.length) throw new Error('内容为空，没有可保存的图');
          const blob = new Blob([renderHtml(data)], { type: 'text/html;charset=utf-8' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = (form.title || '案件') + '-诉讼可视化.html';
          document.body.appendChild(a); a.click(); a.remove();
          setTimeout(() => URL.revokeObjectURL(a.href), 3000);
          setMsg('已下载：' + a.download);
        } catch (e) { setErr(true); setMsg(e.message || String(e)); }
      };
      const loadSample = () => { setForm(fromData(SAMPLE)); setJsonText(JSON.stringify(SAMPLE, null, 2)); setMsg('已载入示例'); };

      const field = (label, key, ph, type) => h('label', { className: 'vz-field' }, [label,
        h('input', { value: form[key], placeholder: ph || '', onChange: (e) => set(key, e.target.value) })]);

      const sec = (title, addLabel, onAdd, children) => h('div', { className: 'vz-sec' }, [
        h('h4', { key: 'h' }, [title, addLabel ? h('button', { key: 'a', className: 'vz-add', onClick: onAdd }, addLabel) : null]),
        ...children,
      ]);

      const formTab = h('div', { key: 'form', className: 'vz-card' }, [
        h('div', { key: 'b', className: 'vz-fgrid' }, [
          field('案件名称 *', 'title', '例如 张某诉李某民间借贷纠纷'),
          field('案号', 'caseNo', '例如（2026）浙0302民初1234号'),
          field('审理法院', 'court', '例如 温州市鹿城区人民法院'),
          field('开庭时间', 'hearingDate', '例如 2026-11-20 09:30'),
          h('label', { key: 's', className: 'vz-field' }, ['视角', h('select', { value: form.side, onChange: (e) => set('side', e.target.value) }, [
            h('option', { key: 'p', value: 'plaintiff' }, '原告 / 申请人'), h('option', { key: 'd', value: 'defendant' }, '被告 / 被申请人'), h('option', { key: 'n', value: 'neutral' }, '中立梳理')])]),
        ]),
        h('label', { key: 'sum', className: 'vz-field' }, ['一句话案情', h('textarea', { value: form.summary, onChange: (e) => set('summary', e.target.value), placeholder: '例如：出借 20 万元到期未还，被告抗辩系赠与' })]),

        sec('当事人', '+ 添加当事人', () => rowAdd('parties', { id: '', name: '', role: '原告' }),
          form.parties.map((p, i) => h('div', { key: i, className: 'vz-row' }, [
            h('label', { className: 'vz-field' }, ['姓名/名称', h('input', { value: p.name, onChange: (e) => rowSet('parties', i, 'name', e.target.value) })]),
            h('label', { className: 'vz-field' }, ['身份', h('input', { value: p.role, onChange: (e) => rowSet('parties', i, 'role', e.target.value), placeholder: '原告/被告/第三人/担保人' })]),
            h('button', { className: 'vz-del', onClick: () => rowDel('parties', i) }, '删除'),
          ]))),

        sec('事件（时间轴）', '+ 添加事件', () => rowAdd('events', { date: '', actor: '', fact: '', evidence: '', significance: '🟡', note: '' }),
          form.events.map((e, i) => h('div', { key: i, className: 'vz-event' }, [
            h('div', { key: 'l1', className: 'vz-row' }, [
              h('label', { className: 'vz-field', style: { maxWidth: 128 } }, ['日期', h('input', { value: e.date, placeholder: '2024-05-01', onChange: (ev) => rowSet('events', i, 'date', ev.target.value) })]),
              h('label', { className: 'vz-field', style: { maxWidth: 110 } }, ['主体', h('input', { value: e.actor, onChange: (ev) => rowSet('events', i, 'actor', ev.target.value) })]),
              h('label', { className: 'vz-field', style: { maxWidth: 84 } }, ['重要性', h('select', { value: e.significance, onChange: (ev) => rowSet('events', i, 'significance', ev.target.value) }, ['🔴', '🟡', '⚪'].map((x) => h('option', { key: x, value: x }, x)))]),
              h('button', { className: 'vz-del', onClick: () => rowDel('events', i) }, '删除'),
            ]),
            h('div', { key: 'l2', className: 'vz-row' }, [
              h('label', { className: 'vz-field' }, ['发生了什么', h('input', { value: e.fact, onChange: (ev) => rowSet('events', i, 'fact', ev.target.value) })]),
              h('label', { className: 'vz-field', style: { maxWidth: 112 } }, ['证据编号', h('input', { value: e.evidence, placeholder: 'E1,E2', onChange: (ev) => rowSet('events', i, 'evidence', ev.target.value) })]),
            ]),
          ]))),
        sec('待证事实', '+ 添加事实', () => rowAdd('facts', { id: 'F' + (form.facts.length + 1), text: '' }),
          form.facts.map((f, i) => h('div', { key: i, className: 'vz-row' }, [
            h('label', { className: 'vz-field', style: { maxWidth: 80 } }, ['编号', h('input', { value: f.id, onChange: (e) => rowSet('facts', i, 'id', e.target.value) })]),
            h('label', { className: 'vz-field' }, ['事实', h('input', { value: f.text, placeholder: '例如 借贷合意', onChange: (e) => rowSet('facts', i, 'text', e.target.value) })]),
            h('button', { className: 'vz-del', onClick: () => rowDel('facts', i) }, '删除'),
          ]))),

        sec('证据', '+ 添加证据', () => rowAdd('evidence', { id: 'E' + (form.evidence.length + 1), name: '', proves: '', status: '已取得' }),
          form.evidence.map((ev, i) => h('div', { key: i, className: 'vz-event' }, [
            h('div', { key: 'l1', className: 'vz-row' }, [
              h('label', { className: 'vz-field', style: { maxWidth: 64 } }, ['编号', h('input', { value: ev.id, onChange: (e) => rowSet('evidence', i, 'id', e.target.value) })]),
              h('label', { className: 'vz-field' }, ['名称', h('input', { value: ev.name, placeholder: '例如 借条', onChange: (e) => rowSet('evidence', i, 'name', e.target.value) })]),
              h('button', { className: 'vz-del', onClick: () => rowDel('evidence', i) }, '删除'),
            ]),
            h('div', { key: 'l2', className: 'vz-row' }, [
              h('label', { className: 'vz-field' }, ['证明哪些事实', h('input', { value: ev.proves, placeholder: 'F1,F2', onChange: (e) => rowSet('evidence', i, 'proves', e.target.value) })]),
              h('label', { className: 'vz-field', style: { maxWidth: 120 } }, ['状态', h('input', { value: ev.status, placeholder: '已取得/待补', onChange: (e) => rowSet('evidence', i, 'status', e.target.value) })]),
            ]),
          ]))),
        sec('争点', '+ 添加争点', () => rowAdd('issues', { point: '', ours: '', theirs: '', evidence: '', tip: '' }),
          form.issues.map((x, i) => h('div', { key: i, style: { display: 'grid', gap: 6 } }, [
            h('div', { className: 'vz-row' }, [
              h('label', { className: 'vz-field' }, ['争点', h('input', { value: x.point, onChange: (e) => rowSet('issues', i, 'point', e.target.value) })]),
              h('button', { className: 'vz-del', onClick: () => rowDel('issues', i) }, '删除'),
            ]),
            h('div', { className: 'vz-row' }, [
              h('label', { className: 'vz-field' }, ['我方主张', h('input', { value: x.ours, onChange: (e) => rowSet('issues', i, 'ours', e.target.value) })]),
              h('label', { className: 'vz-field' }, ['对方抗辩', h('input', { value: x.theirs, onChange: (e) => rowSet('issues', i, 'theirs', e.target.value) })]),
              h('label', { className: 'vz-field', style: { maxWidth: 110 } }, ['证据编号', h('input', { value: x.evidence, placeholder: 'E1,E3', onChange: (e) => rowSet('issues', i, 'evidence', e.target.value) })]),
            ]),
            h('label', { className: 'vz-field' }, ['准备提示（可选）', h('input', { value: x.tip, onChange: (e) => rowSet('issues', i, 'tip', e.target.value) })]),
          ]))),

        h('label', { key: 'g', className: 'vz-field' }, ['证据缺口（一行一条）', h('textarea', { value: form.gapsText, onChange: (e) => set('gapsText', e.target.value), placeholder: '例如：现金 5 万元缺少取现记录' })]),
      ]);

      const jsonTab = h('div', { key: 'json', className: 'vz-card' }, [
        h('div', { className: 'vz-tip' }, '高级：直接编辑 JSON。改完点「应用到表单」，预览仍按表单生成。'),
        h('textarea', { key: 't', className: 'vz-area', value: jsonText, onChange: (e) => setJsonText(e.target.value), spellCheck: false }),
        h('div', { key: 'a', className: 'vz-actions' }, [
          h('button', { className: 'vz-btn', onClick: () => { try { const d = JSON.parse(jsonText); setForm(fromData(d)); setMsg('已应用到表单'); setErr(false); } catch (e) { setErr(true); setMsg('JSON 解析失败：' + e.message); } } }, '应用到表单'),
          h('button', { className: 'vz-btn ghost', onClick: () => { setJsonText(JSON.stringify(toData(form), null, 2)); setMsg('已从表单生成 JSON'); } }, '从表单生成 JSON'),
        ]),
      ]);

      const tableTab = h('div', { key: 'table', className: 'vz-card' }, [
        h('div', { className: 'vz-tip' }, '从 Word/Excel 复制 Markdown 表格：表头含「日期/主体/事实/证据/重要性」→ 事件；「编号/事实」→ 待证事实；「编号/名称/证明事实/状态」→ 证据。'),
        h('textarea', { key: 't', className: 'vz-area', value: tableText, onChange: (e) => setTableText(e.target.value), placeholder: '| 日期 | 主体 | 事实 | 证据 | 重要性 |\n|---|---|---|---|---|\n| 2024-05-01 | 李某 | 借款20万 | E1 | 🔴 |' }),
        h('div', { key: 'a', className: 'vz-actions' }, [h('button', { className: 'vz-btn', onClick: parseTables }, '解析并填入表单')]),
      ]);

      function parseTables() {
        const lines = tableText.split(/\r?\n/); const blocks = []; let cur = [];
        for (const ln of lines) { if (/^\s*\|.*\|\s*$/.test(ln)) cur.push(ln.trim()); else { if (cur.length >= 2) blocks.push(cur); cur = []; } }
        if (cur.length >= 2) blocks.push(cur);
        const cells = (ln) => ln.replace(/^\|/, '').replace(/\|$/, '').split('|').map((x) => x.trim());
        let next = fromData(toData(form)); let hit = 0;
        for (const b of blocks) {
          const head = cells(b[0]).map((x) => x.replace(/\*/g, '')); const rows = b.slice(2).map(cells);
          const idx = (k) => head.findIndex((x) => x.includes(k));
          if (head.some((x) => x.includes('日期'))) {
            next.events = rows.map((r) => ({ date: r[idx('日期')] || '', actor: idx('主体') >= 0 ? r[idx('主体')] : '', fact: idx('事实') >= 0 ? r[idx('事实')] : '', evidence: (idx('证据') >= 0 ? r[idx('证据')] : '').replace(/[，、\s]+/g, ','), significance: idx('重要') >= 0 ? r[idx('重要')] : '⚪', note: '' })).filter((x) => x.date || x.fact); hit++;
          } else if (head.some((x) => x.includes('编号')) && head.some((x) => x.includes('事实'))) {
            next.facts = rows.map((r) => ({ id: r[idx('编号')] || '', text: r[idx('事实')] || '' })).filter((x) => x.id || x.text); hit++;
          } else if (head.some((x) => x.includes('编号')) && (head.some((x) => x.includes('名称')) || head.some((x) => x === '证据'))) {
            next.evidence = rows.map((r) => ({ id: r[idx('编号')] || '', name: (idx('名称') >= 0 ? r[idx('名称')] : r[idx('证据')]) || '', proves: (idx('证明') >= 0 ? r[idx('证明')] : '').replace(/[，、\s]+/g, ','), status: idx('状态') >= 0 ? r[idx('状态')] : '' })).filter((x) => x.id || x.name); hit++;
          }
        }
        if (!hit) { setErr(true); setMsg('没识别到表格，检查表头。'); return; }
        setForm(next); setTab('form'); setErr(false); setMsg('已填入 ' + hit + ' 组数据，检查后点「生成预览」');
      }

      const pick = () => {
        const el = document.createElement('input'); el.type = 'file'; el.accept = '.json,.txt';
        el.onchange = () => { const f = el.files && el.files[0]; if (!f) return; const reader = new FileReader(); reader.onload = () => { try { const d = JSON.parse(String(reader.result)); setForm(fromData(d)); setJsonText(JSON.stringify(d, null, 2)); setMsg('已载入 ' + f.name); setErr(false); } catch (e) { setErr(true); setMsg('文件不是合法 JSON'); } }; reader.readAsText(f); };
        el.click();
      };

      const editor = h('div', { key: 'e', className: 'vz-edit' }, [
        h('div', { key: 'tabs', className: 'vz-tabs' }, [
          h('button', { key: 'f', className: 'vz-tab' + (tab === 'form' ? ' on' : ''), onClick: () => setTab('form') }, '表单填写'),
          h('button', { key: 'j', className: 'vz-tab' + (tab === 'json' ? ' on' : ''), onClick: () => { setJsonText(JSON.stringify(toData(form), null, 2)); setTab('json'); } }, '高级 JSON'),
          h('button', { key: 't', className: 'vz-tab' + (tab === 'table' ? ' on' : ''), onClick: () => setTab('table') }, '表格导入'),
        ]),
        tab === 'form' ? formTab : tab === 'json' ? jsonTab : tableTab,
        h('div', { key: 'act', className: 'vz-actions' }, [
          h('button', { key: 'p', className: 'vz-btn', disabled: busy, onClick: preview }, busy ? '处理中…' : '生成预览'),
          h('button', { key: 's', className: 'vz-btn ghost', disabled: busy, onClick: save }, '保存 HTML'),
          h('button', { key: 'l', className: 'vz-btn ghost', onClick: loadSample }, '载入示例'),
          h('button', { key: 'c', className: 'vz-btn ghost', onClick: () => { setForm(fromData(EMPTY)); setMsg('已清空'); } }, '清空'),
          h('button', { key: 'f2', className: 'vz-btn ghost', onClick: pick }, '导入 JSON'),
        ]),
      ]);
      const previewCol = h('div', { key: 'p', className: 'vz-preview' }, [
        h('div', { key: 'm', className: 'vz-pmsg' + (err ? ' err' : '') }, msg || '填好后点「生成预览」，成品会显示在这里；可保存为单文件 HTML。'),
        html ? h('iframe', { key: 'i', className: 'vz-frame', srcDoc: html, sandbox: 'allow-same-origin' }) : h('div', { key: 'ph', className: 'vz-placeholder' }, '预览区'),
      ]);
      return h('div', { className: 'vz-root' }, [
        h('style', { key: 'c' }, CSS),
        h('div', { key: 'h', className: 'vz-head' }, [h(Ico, { key: 'i' }), h('div', { key: 't' }, [
          h('div', { key: 'a', className: 'vz-title' }, '法律·诉讼可视化'),
          h('div', { key: 'b', className: 'vz-sub' }, ['表单填写，生成时间轴 · 关系图 · 证据矩阵 · 争点对照', h('span', { key: 'v', className: 'vz-ver' }, 'v' + 版本)]),
        ])]),
        h('div', { key: 'body', className: 'vz-body' }, [editor, previewCol]),
        h('div', { key: 'tip', className: 'vz-tip' }, '只画你填的内容；没证据的事实会在矩阵里标红，缺的写进「证据缺口」。'),
        h('a', { key: 'bg', className: 'vz-badge', href: 'https://deepwhale.org.cn', target: '_blank', rel: 'noopener noreferrer', title: '深鲸桌面 · deepwhale.org.cn' }, h('img', { src: BADGE, width: 121, height: 20, alt: 'powered by dwh' })),
      ]);
    }
    const inject = ['slots'];
    function apply(ctx) {
      const 试 = (n, f) => { try { f(); } catch (e) { try { console.warn('[legal-viz] ' + n + ' 注册失败：' + (e && e.message)); } catch {} } };
      试('侧栏图标', () => ctx.slots.inject(SLOT_ICON, function* () { yield ctx.slots.register({ name: SLOT_ICON, id: PANEL_ID, order: 43, label: '法律·诉讼可视化' }, Ico); }));
      试('主面板', () => ctx.slots.inject(SLOT_MAIN, function* () { yield ctx.slots.register({ name: SLOT_MAIN, key: PANEL_ID }, Panel); }));
    }
    exports.inject = inject; exports.apply = apply; return module.exports;
  },
});
