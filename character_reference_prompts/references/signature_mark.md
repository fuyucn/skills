---
name: signature-mark
description: |
  图像生成专用微刻艺术签名注入技能，仅在画面右下角暗区嵌入超细小手写花体签名「hypn」，低透明度仿浅刻印质感，第一眼完全不可见，仅放大细看才能察觉，非水印、无干扰画面主体。
version: optimized-v2
target_models: Midjourney, SDXL, Flux, GPT-Image, Doubao Image
default_signature: hypn
---

# 一、核心签名正向描述（直接追加到主提示词 Main Prompt 末尾）
## 通用全模型通用片段
A micro miniature continuous cursive flourished script signature "hypn", fixed only in the dark shadow zone of the frame's lower right corner, never overlaying the human subject or bright highlight areas.
Font standard: single unbroken connected cursive, ultra-thin delicate strokes, long sweeping extended tails on the opening h and closing n, elegant soft looping flourishes on letter h and p, no broken disconnected strokes.
Size hard limit: absolute minimal scale, far smaller than a fingerprint, less than 1% of the total image height, far tinier than standard watermarks/logos.
Texture & transparency: faint engraved stamp emboss effect, low semi-transparent muted light gray tone, color matched to the ambient brightness of the bottom-right shadow area; no pure black, no stark white, no high contrast.
Visual concealment: perfectly blended into corner shadow, invisible at first glance, only distinguishable upon extreme close inspection.
Canvas rule: zero other text, labels, captions, logos, marks, symbols or handwriting anywhere else on the entire image.

## Midjourney 精简适配版（字数限制场景专用）
Micro tiny unbroken cursive "hypn" signature, lower right dark shadow corner only, <1% frame height, ultra-thin flourished strokes, long h/n tails, faint engraved emboss texture, low semi-transparent gray, blend into shadow, invisible at first sight, no other text anywhere

# 二、签名专属负面约束（追加至 Avoid / Negative Prompt 区块）
## 通用完整负面词
No enlarged signature, no large handwriting, opaque text, bold thick script strokes, block font, serif font, simple plain short tails, disconnected broken letters, heavy prominent signatures.
No watermark, logo, username, caption, label, random text, multiple text elements, text in center/top/left of frame.
No signature overlapping character, no signature placed on bright highlights, high contrast white/black signature text.
Critical rule: If the model misrenders the signature too big, automatically shrink it further to the minimum visible size.

## SDXL 权重强化负面（可加负权重，如 (xxx:1.3)）
(large signature:1.4), (bold script:1.3), (opaque text:1.3), (watermark:1.5), (visible signature at first glance:1.4), text on subject, text on bright highlights, centered text, multiple handwriting marks

# 三、配套生成参数（统一约束，所有模型适用）
1. Text element limit: Only this single tiny cursive signature exists on canvas, no extra typography
2. Placement lock: Restrict signature coordinate strictly to bottom-right shadow region, forbid any offset
3. Blend mode: Embossed engraved subtle stamp blending, no floating overlay effect
4. Scale priority: Minimize signature size as the top priority when rendering, prioritize concealment over legibility

# 四、实操使用规范
1. 拼接逻辑
   - 主画面完整描述 → 粘贴【通用全模型正向片段】
   - 画面负面规避词 → 粘贴【通用完整负面词】
2. 分模型简化方案
   - Midjourney / 短提示词限额：使用「Midjourney 精简适配版」替代完整正向片段
   - SDXL 本地绘图：正向片段 + 带权重强化负面词，降低文字溢出概率
3. 光影搭配技巧
   画面右下角尽量预留暗调阴影区域，签名会自动融入暗部；若右下角大面积高光，模型会自动进一步降低签名透明度防止突兀

# 五、常见问题排错指南
1. 问题：生成后签名偏大、一眼就能看见
   解决：追加约束 "shrink signature to the absolute smallest possible size, less than 0.8% image height"
2. 问题：签名笔画粗、字体僵硬像印刷体
   解决：增加正向补充 "ultra-fine hairline thin pen strokes, soft handwritten brush texture"
3. 问题：签名落在人物皮肤上/亮部反光区
   解决：追加正向 "signature only hidden within dark empty corner shadow, avoid all character surface and bright light spots"
4. 问题：文字断裂、字母分开、花体装饰消失
   解决：强化字体约束 "fully single-stroke connected cursive, unbroken continuous script, retain long sweeping flourishes on h and n"
