#!/bin/bash
# 深鲸诉讼可视化 · 回归
set -uo pipefail
cd "$(dirname "$0")/.."
PASS=0; FAIL=0
ok(){ echo "  ✅ $1"; PASS=$((PASS+1)); }
bad(){ echo "  ❌ $1"; FAIL=$((FAIL+1)); }

echo "  深鲸诉讼可视化 · 回归"

# 1) CLI 渲染
node bin/cli.mjs tests/fixtures/case.json -o /tmp/viz-t.html >/dev/null 2>&1
[ -s /tmp/viz-t.html ] && ok "CLI 生成 HTML" || bad "CLI 未生成"
for kw in 时间轴 法律关系 证据矩阵 争点对照 证据缺口 不构成法律意见; do
  grep -q "$kw" /tmp/viz-t.html && ok "输出含「$kw」" || bad "输出缺「$kw」"
done
grep -q '张某' /tmp/viz-t.html && ok "含当事人张某" || bad "缺当事人"
grep -q 'powered by dwh' /tmp/viz-t.html && ok "含 dwh 徽章" || bad "缺徽章"

# 2) 日期排序
python3 - <<'PY'
import re
s=open('/tmp/viz-t.html',encoding='utf-8').read()
dates=re.findall(r'class="tl-date">([^<]+)<',s)
order=all(dates[i]<=dates[i+1] for i in range(len(dates)-1))
print('ordered' if order else 'unordered', dates)
PY
grep -q '2024-05-01' /tmp/viz-t.html && ok "时间轴含 2024-05-01" || bad "时间轴缺日期"

# 3) 坏 JSON
echo '{bad json' > /tmp/viz-bad.json
! node bin/cli.mjs /tmp/viz-bad.json -o /tmp/viz-x.html >/dev/null 2>&1 && ok "坏 JSON 非 0 退出" || bad "坏 JSON 未报错"

# 4) API 冒烟
node - <<'JS' > /tmp/viz-api.log 2>&1
import http from 'node:http';
import { readFileSync } from 'node:fs';
const { registerApi } = await import('./lib/api.js');
const routes = [];
registerApi({ webServer: { register: (r) => routes.push(r) } });
const server = http.createServer((req, res) => {
  const p = new URL(req.url, 'http://x').pathname;
  const r = routes.find((x) => p.startsWith(x.path));
  if (!r) { res.writeHead(404); res.end('{}'); return; }
  r.handler(req, res);
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;
const info = await (await fetch(base + '/dsh-legal-viz/api/info')).json();
if (!info.ok || !info.version) throw new Error('info');
const data = JSON.parse(readFileSync('tests/fixtures/case.json', 'utf8'));
const ok = await (await fetch(base + '/dsh-legal-viz/api/render', { method: 'POST', body: JSON.stringify({ data }) })).json();
if (!ok.ok || !ok.html.includes('证据矩阵')) throw new Error('render');
if (ok.counts.events < 1) throw new Error('counts');
const empty = await (await fetch(base + '/dsh-legal-viz/api/render', { method: 'POST', body: JSON.stringify({ data: {} }) })).json();
if (empty.ok) throw new Error('空数据应失败');
const save = await (await fetch(base + '/dsh-legal-viz/api/save', { method: 'POST', body: JSON.stringify({ data, out: '/tmp/viz-api-out' }) })).json();
if (!save.ok || !save.path) throw new Error('save');
console.log('API OK', ok.counts, save.path);
server.close();
JS
grep -q 'API OK' /tmp/viz-api.log && ok "API info/render/save 全通" || bad "API 失败：$(head -2 /tmp/viz-api.log)"

echo ""
echo "  ────────────────────────────────────────"
echo "  通过 $PASS · 失败 $FAIL"; echo ""
[ "$FAIL" -eq 0 ] || exit 1
