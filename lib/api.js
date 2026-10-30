/** 深鲸诉讼可视化 · 宿主出口 */
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { renderHtml, normalize } from './render.mjs';

const PKG_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const ROUTE = '/dsh-legal-viz';
const VERSION = (() => { try { return JSON.parse(readFileSync(join(PKG_ROOT, 'package.json'), 'utf8')).version || ''; } catch { return ''; } })();
const 回 = (res, code, obj) => { const b = JSON.stringify(obj); res.writeHead(code, { 'content-type': 'application/json; charset=utf-8', 'content-length': Buffer.byteLength(b) }); res.end(b); };
const 读体 = async (req) => { const c = []; for await (const x of req) c.push(x); const t = Buffer.concat(c).toString('utf8'); if (!t) return {}; try { return JSON.parse(t); } catch { return {}; } };

function safeName(d) {
  const base = String(d.title || '案件梳理').replace(/[\\/:*?"<>|\s]+/g, '-').slice(0, 60);
  return base + '-诉讼可视化.html';
}

export function registerApi(ctx) {
  const handler = async (req, res) => {
    try {
      const u = new URL(req.url || '/', 'http://127.0.0.1');
      if (u.pathname === `${ROUTE}/api/info`) return 回(res, 200, { ok: true, version: VERSION });
      if (u.pathname === `${ROUTE}/api/render` && req.method === 'POST') {
        const b = await 读体(req);
        const data = b.data || b;
        if (!data || typeof data !== 'object') return 回(res, 400, { ok: false, error: '请提供案件 JSON' });
        const d = normalize(data);
        if (!d.events.length && !d.relations.length && !d.evidence.length) {
          return 回(res, 400, { ok: false, error: '至少要有一段 events / relations / evidence，否则画不出东西' });
        }
        return 回(res, 200, { ok: true, html: renderHtml(d), counts: { events: d.events.length, evidence: d.evidence.length, issues: d.issues.length } });
      }
      if (u.pathname === `${ROUTE}/api/save` && req.method === 'POST') {
        const b = await 读体(req);
        const data = b.data || {};
        const d = normalize(data);
        if (!d.events.length && !d.relations.length && !d.evidence.length) return 回(res, 400, { ok: false, error: '内容为空，未保存' });
        const dir = String(b.out || '').trim() || join(homedir(), 'Desktop', '诉讼可视化');
        mkdirSync(dir, { recursive: true });
        const file = join(dir, safeName(d));
        writeFileSync(file, renderHtml(d), 'utf8');
        return 回(res, 200, { ok: true, path: file });
      }
      return 回(res, 404, { ok: false, error: 'not found' });
    } catch (e) { return 回(res, 500, { ok: false, error: e?.message || String(e) }); }
  };
  ctx.webServer.register({ kind: 'prefix', path: ROUTE, handler });
}
