---
name: signature-mark-2
description: |
  图像生成专用隐写式签名注入技能，将超细手写花体签名「hypn」自适应嵌入人物身体纹理暗区（深色头发底层 / 深色衣物褶皱阴影），高透明度浅灰透白基底，缩略图完全隐形，仅放大原图才能微弱辨识，绝不出现在角落或背景。
version: v3-body-embed
target_models: Midjourney, SDXL, Flux, GPT-Image, Doubao Image
default_signature: hypn
---

# 一、核心签名正向描述（直接追加到主提示词 Main Prompt 末尾）

## 通用全模型通用片段
A micro miniature continuous cursive flourished script signature "hypn", embedded exclusively within the subject's body texture dark zones — either deep within dark hair shadow layers (rear head, top of head, or hair tips only, away from face) or within the shadow folds of dark clothing wrinkles. Never placed in any corner, background empty space, or facial area.

Font standard: single unbroken connected cursive, ultra-thin hairline strokes, long sweeping extended tails on the opening h and closing n, elegant soft looping flourishes on letter h and p, no broken disconnected strokes.

Size hard limit: absolute minimal scale, far smaller than a fingerprint, 0.01%–0.1% of the total image height, far tinier than standard watermarks/logos.

Transparency & color: extremely high transparency, base tone in extremely faint light gray or translucent white, absolutely no pure black, no dark gray, no high contrast. The signature is not a superimposed layer of gray — it is a faint density variation within the existing texture of the embedding zone, matching the zone's native tone exactly with no independent hue or saturation.

Visual concealment: perfectly indistinguishable at thumbnail or mobile preview size, invisible at first glance, only faintly discernible upon extreme close inspection of the full-resolution image.

Canvas rule: exactly one single signature exists, zero other text, labels, captions, logos, marks, symbols or handwriting anywhere else on the entire image.

## Midjourney 精简适配版（字数限制场景专用）
Micro tiny unbroken cursive "hypn" signature, embedded only in subject's dark hair shadow or dark clothing wrinkle shadow, away from face, no corners no background, <0.1% frame height, ultra-thin flourished strokes, long h/n tails, extreme high transparency, faint light gray translucent white base, blend into body texture, invisible at thumbnail size, no other text anywhere

# 二、签名专属负面约束（追加至 Avoid / Negative Prompt 区块）

## 通用完整负面词
No enlarged signature, no large handwriting, opaque text, bold thick script strokes, block font, serif font, simple plain short tails, disconnected broken letters, heavy prominent signatures.
No pure black signature, no dark gray signature, no high contrast signature text.
No signature in bottom-right corner, bottom-left corner, any corner, background area, facial area, chest prints, bright highlight surfaces.
No signature overlapping face, facial features, hands, clothing prints or main subject elements.
No watermark, logo, username, caption, label, random text, multiple text elements.
Critical rule: If the model misrenders the signature too big or visible at a glance, automatically shrink it further by 50% and double the transparency, deep blend into the base color.

## SDXL 权重强化负面（可加负权重，如 (xxx:1.3)）
(large signature:1.4), (bold script:1.3), (opaque text:1.3), (watermark:1.5), (visible signature at first glance:1.4), (pure black text:1.3), (dark gray text:1.3), text on face, text on bright highlights, text in corner, text on background, centered text, multiple handwriting marks

# 三、配套生成参数（统一约束，所有模型适用）
1. Text element limit: Only this single tiny cursive signature exists on canvas, no extra typography
2. Placement lock: Restrict signature exclusively to subject's body texture dark zones (dark hair shadow or dark clothing wrinkle shadow), strictly forbid corners and background
3. Tone matching: Signature base must be extremely faint light gray or translucent white, must match the embedding zone's native tone — it is a texture density variation, not a superimposed ink layer
4. Scale priority: Minimize signature size as the top priority when rendering, prioritize concealment over legibility
5. Transparency priority: Use the highest possible transparency, signature should be completely invisible at thumbnail/mobile preview size

# 四、实操使用规范
1. 拼接逻辑
   - 主画面完整描述 → 粘贴【通用全模型正向片段】
   - 画面负面规避词 → 粘贴【通用完整负面词】
2. 分模型简化方案
   - Midjourney / 短提示词限额：使用「Midjourney 精简适配版」替代完整正向片段
   - SDXL 本地绘图：正向片段 + 带权重强化负面词，降低文字溢出概率
3. 嵌入位置技巧
   人物深色头发（后脑/头顶/发梢）和深色衣物褶皱阴影是最佳嵌入区；若人物头发浅色且衣物浅色，优先选择画面中人物身上最暗的纹理区域；绝不使用角落和背景作为嵌入位置
4. 透明度与色调
   签名基底固定使用极浅淡灰或极浅透白，配合极高透明度；若嵌入区底色偏暖，签名也保持灰白基底不变，通过透明度融合而非色调跟随

# 五、与 signature_mark.md (v2) 的区别
| 维度 | signature_mark (v2) | signature_mark_2 (v3) |
|------|---------------------|----------------------|
| 嵌入位置 | 画面右下角暗区 | 人物身体纹理暗区（头发/衣物） |
| 基底颜色 | 低饱和灰，色调跟随区域 | 极浅淡灰/极浅透白，固定基底 |
| 透明度 | 低半透明 | 极高透明度 |
| 面部规避 | 不遮挡五官 | 远离面部区域，仅后脑/头顶/发梢 |
| 角落策略 | 优先右下角 | 禁止所有角落 |
| 适用场景 | 通用画面 | 卡通人物/真人照片为主 |

# 六、常见问题排错指南
1. 问题：签名出现在右下角或背景
   解决：强化负面 "(text in corner:1.5), (text on background:1.4)"，正向追加 "signature only inside subject's dark hair or dark clothing, never in corner or background"
2. 问题：签名颜色偏深、纯黑或深灰
   解决：正向追加 "signature has no independent color, base is extremely faint translucent white, no black no dark gray"
3. 问题：签名落在面部附近
   解决：正向追加 "signature only in rear head hair, top of head hair, or hair tips, strictly away from face and facial area"
4. 问题：签名偏大、缩略图可见
   解决：追加约束 "shrink signature to the absolute smallest possible size, less than 0.05% image height, double the transparency"
5. 问题：签名笔画粗、字体僵硬像印刷体
   解决：正向补充 "ultra-fine hairline thin pen strokes, soft handwritten brush texture"
6. 问题：文字断裂、字母分开、花体装饰消失
   解决：强化字体约束 "fully single-stroke connected cursive, unbroken continuous script, retain long sweeping flourishes on h and n"
