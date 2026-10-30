#!/usr/bin/env node
/** 深鲸诉讼可视化 · CLI：case.json → 单文件 HTML */
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, extname, join } from 'node:path';
import { renderHtml } from '../lib/render.mjs';

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);
const opt = (f, d) => { const i = argv.indexOf(f); return i >= 0 ? argv[i + 1] : d; };

if (has('--help') || has('-h') || argv.length === 0) {
  console.log(`深鲸诉讼可视化

用法：
  dsh-legal-viz <case.json> [-o 输出.html]
  dsh-legal-viz --demo [-o 输出.html]
  dsh-legal-viz --help

输入 JSON 的 schema 见 skill/legal-litigation-viz.md。`);
  process.exit(0);
}

let data;
if (has('--demo')) {
  data = JSON.parse(readFileSync(join(import.meta.dirname, '..', 'lib', 'data', 'sample.json'), 'utf8'));
} else {
  const file = argv.find((x) => !x.startsWith('-') && extname(x) === '.json') || argv[0];
  if (!file || !file.endsWith('.json')) { console.error('请给一个 .json 文件，或 --demo'); process.exit(2); }
  data = JSON.parse(readFileSync(file, 'utf8'));
}
const out = opt('-o', opt('--out', join(process.cwd(), (data.title || basename('case')) + '-诉讼可视化.html')));
writeFileSync(out, renderHtml(data), 'utf8');
console.log('已生成：' + out);
