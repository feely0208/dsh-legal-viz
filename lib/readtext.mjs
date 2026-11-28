/** 本地读取 docx/pdf/图片/md/txt，返回分页文本（不联网） */
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';
import { spawn } from 'node:child_process';
import { mkdtempSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

export const READABLE = ['.md', '.txt', '.markdown', '.docx', '.pdf'];
export const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.bmp', '.webp', '.tif', '.tiff'];

function runOcr(file) {
  return new Promise((resolve) => {
    const p = spawn('tesseract', [file, 'stdout', '-l', 'chi_sim+eng', '--psm', '6'], { stdio: ['ignore', 'pipe', 'ignore'] });
    let out = ''; const timer = setTimeout(() => { try { p.kill(); } catch {} }, 60000);
    p.stdout.on('data', (d) => { out += d.toString('utf8'); });
    p.on('close', () => { clearTimeout(timer); resolve(out.trim()); });
    p.on('error', () => { clearTimeout(timer); resolve(''); });
  });
}

/** 扫描件 PDF：用本机 poppler 渲染成图片再 OCR（不联网） */
async function ocrPdf(path, maxPages = 20) {
  const dir = mkdtempSync(join(tmpdir(), 'dwh-pdf-'));
  const prefix = join(dir, 'p');
  await new Promise((resolve) => {
    const p = spawn('pdftoppm', ['-r', '300', '-png', '-f', '1', '-l', String(maxPages), path, prefix], { stdio: 'ignore' });
    const timer = setTimeout(() => { try { p.kill(); } catch {} resolve(); }, 120000);
    p.on('close', () => { clearTimeout(timer); resolve(); });
    p.on('error', () => { clearTimeout(timer); resolve(); });
  });
  let files = [];
  try { files = readdirSync(dir).filter((n) => n.endsWith('.png')).sort(); } catch {}
  const pages = [];
  for (let i = 0; i < files.length; i++) {
    const text = await runOcr(join(dir, files[i]));
    pages.push({ page: i + 1, text });
  }
  return pages;
}

function runTesseract(file) {
  return new Promise((resolve) => {
    const p = spawn('tesseract', [file, 'stdout', '-l', 'chi_sim+eng', '--psm', '6'], { stdio: ['ignore', 'pipe', 'ignore'] });
    let out = ''; const timer = setTimeout(() => { try { p.kill(); } catch {} }, 90000);
    p.stdout.on('data', (d) => { out += d.toString('utf8'); });
    p.on('close', () => { clearTimeout(timer); resolve(out.trim()); });
    p.on('error', () => { clearTimeout(timer); resolve(''); });
  });
}

/** 返回 { pages: [{page, text}], pageCount }，page 为 null 表示无分页 */
export async function readPages(path) {
  const ext = extname(path).toLowerCase();
  try {
    if (['.md', '.txt', '.markdown'].includes(ext)) return { pages: [{ page: null, text: readFileSync(path, 'utf8') }], pageCount: null };
    if (ext === '.docx') {
      const mammoth = (await import('mammoth')).default;
      const r = await mammoth.extractRawText({ buffer: readFileSync(path) });
      return { pages: [{ page: null, text: r.value || '' }], pageCount: null };
    }
    if (ext === '.pdf') {
      const { extractText, getDocumentProxy } = await import('unpdf');
      const doc = await getDocumentProxy(new Uint8Array(readFileSync(path)));
      const r = await extractText(doc, { mergePages: false });
      const arr = Array.isArray(r.text) ? r.text : [String(r.text || '')];
      let pages = arr.map((t, i) => ({ page: i + 1, text: String(t || '') }));
      const chars = pages.reduce((n, p) => n + p.text.trim().length, 0);
      if (chars < 40) {
        const ocrPages = await ocrPdf(path);
        if (ocrPages.length) return { pages: ocrPages, pageCount: ocrPages.length, ocr: true, scanned: true };
      }
      return { pages, pageCount: pages.length, scanned: false };
    }
    if (IMAGE_EXT.includes(ext)) {
      const text = await runOcr(path);
      return { pages: [{ page: null, text }], pageCount: null, ocr: true };
    }
  } catch { return { pages: [], pageCount: null }; }
  return { pages: [], pageCount: null };
}

/** 从文本里抽当事人姓名（只抽明确带性别/姓名的，不猜） */
export function extractParties(pages) {
  const names = new Set();
  const stop = /出生|住址|户籍|民族|身份|联系|电话|地址|当事|人民|公安|大队|法院|公司|有限|保险|医院/;
  for (const pg of pages) {
    const t = String(pg.text || '');
    let m;
    const re1 = /([\u4e00-\u9fa5]{2,4})\s*[，,]\s*[男女]/g;
    while ((m = re1.exec(t))) { if (!stop.test(m[1])) names.add(m[1]); }
    const re2 = /(?:当事人|姓名|被询问人|驾驶人)[：:]\s*([\u4e00-\u9fa5]{2,4})/g;
    while ((m = re2.exec(t))) { if (!stop.test(m[1])) names.add(m[1]); }
  }
  return [...names].slice(0, 8);
}

/** 从分页文本里抽「日期 + 所在句子」候选事件；只抽取，不改写 */
export function extractCandidates(pages, sourceName) {
  const out = [];
  for (const pg of pages) {
    const flat = String(pg.text || '').replace(/\r/g, '');
    const re = /(19|20)\d{2}\s*[年\-./]\s*\d{1,2}\s*[月\-./]\s*\d{1,2}\s*日?/g;
    let m;
    while ((m = re.exec(flat)) && out.length < 40) {
      const start = Math.max(0, flat.lastIndexOf('\n', m.index) + 1);
      const endNl = flat.indexOf('\n', m.index);
      const end = endNl > 0 ? endNl : Math.min(flat.length, m.index + 120);
      let sentence = flat.slice(start, end).trim().replace(/\s+/g, ' ');
      if (sentence.length > 110) sentence = sentence.slice(0, 110) + '…';
      const nums = m[0].match(/\d+/g) || [];
      if (nums.length < 3) continue;
      const date = `${nums[0]}-${String(nums[1]).padStart(2, '0')}-${String(nums[2]).padStart(2, '0')}`;
      if (/出生日期|有效期|发证机关|初次领证|身份证.{0,6}有效/.test(sentence)) continue;
      if (/住址|户籍|民族|苗族|汉族/.test(sentence)) continue;
      if (!out.find((x) => x.date === date && x.fact === sentence && x.page === pg.page)) {
        out.push({ date, fact: sentence, page: pg.page, quote: sentence, source: sourceName });
      }
    }
  }
  return out;
}
