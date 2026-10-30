import { createPlugin, pkgRootFrom } from '@deepwhale-cn/dsh-guard-core/plugin';
import { registerApi } from './api.js';

const base = createPlugin({
  name: 'legal-viz',
  pkgRoot: pkgRootFrom(import.meta.url),
  skillFile: 'skill/legal-litigation-viz.md',
  binFile: 'bin/cli.mjs',
  description: '深鲸诉讼可视化：把案情与证据 JSON 画成时间轴、法律关系图、证据矩阵、争点对照，输出可打印的单文件 HTML。',
  whenToUse: '当用户要做诉讼可视化、画时间轴、理法律关系、做证据矩阵或争点对照时使用。',
});
export const name = base.name;
export const inject = [...base.inject, 'webServer'];
export function apply(ctx) {
  base.apply(ctx);
  try { if (ctx.webServer?.register) registerApi(ctx); } catch (e) { ctx.logger?.warn?.('[legal-viz] 面板出口注册失败: ' + (e?.message || e)); }
}
