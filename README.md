# 深鲸诉讼可视化（DSH 插件）

**把案情与证据画成一张能打印的图**：时间轴、法律关系图、证据矩阵、争点对照。侧栏面板操作，输出单文件 HTML，不依赖网络。

## 功能

- 案件 JSON → 四个视图（时间轴 / 关系图 / 证据矩阵 / 争点对照）
- 面板内直接粘贴 JSON 或选文件，生成预览、保存 HTML
- 原告 / 被告 / 中立三套配色，🔴🟡⚪ 三档重要性
- 纯 Node 渲染，无第三方依赖；SVG 手绘关系图，A4 打印友好
- 证据缺口单独列出，避免「图很完整、庭上被问住」

## 安装

```bash
dsh plugin --profile web add @deepwhale-cn/dsh-legal-viz
```

重启 DSH 后侧栏出现「法律·诉讼可视化」。

## CLI

```bash
dsh-legal-viz case.json -o 案件-诉讼可视化.html
dsh-legal-viz --demo
```

## 许可

MIT。输出不构成法律意见，须由承办律师复核。
