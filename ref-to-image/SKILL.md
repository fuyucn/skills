---
name: ref-to-image
description: |
  参考图+提示词生成新图：单人或多人参考照片 × 场景/风格提示词 → 保持人物身份生成新图。
  核心能力：P1/P2多人提示词结构、身份锚点保留、严格保脸模式、身份图/风格图隔离、自然表情适配、失败修复。
  触发词：「参考图生成」「合照」「换装」「换场景」「保持容貌」「两人合照」
  「P1 P2」「用照片生成」「保留长相」「换背景」「图片参考生图」「人物一致性」
  「参考照片换场景」「保持脸不变」「多人同框」「防止脸混」「照片变大片」
  「只用我的脸」「参考这个风格」「不要用参考图里的人脸」「保持身份」「换成我」。
---

# 参考图生图·提示词框架

> 保留的是这个人，改变的是这个场景；身份要稳定，表情要活。

---

## 核心工作模式

| 模式 | 输入 | 输出 |
|------|------|------|
| **单人换装/换场景** | 1张人物参考图 + 场景描述 | 同一人物，新场景/新造型 |
| **双人合照** | P1照片 + P2照片 + 场景描述 | 两人同框新图 |
| **多人场景** | P1~PN照片 + 场景描述 | 多人同框新图 |
| **风格迁移** | 人物参考图 + 风格描述 | 同一人物，新艺术风格 |
| **身份图 + 风格图** | 人物肖像 + 风格/场景/构图参考图 | 用人物肖像身份，套用另一张图的风格/场景 |
| **失败修复** | 生成结果 + 问题描述 | 针对性修复提示词 |

**上传顺序约定**：第1张=P1，第2张=P2，第N张=PN，最后粘贴提示词文本。  
如果用户明确说明“这张是身份图 / 这张是风格图 / 这张是姿势图”，按用户说明优先。

---

## 提示词结构

### 通用原则

- 每个参考人物使用独立编号：`[P1]`、`[P2]`、`[PN]`
- 每个人物先写**身份锚点**，再写**表情/光影/场景适配**，最后写**可变内容**
- 人物参考图默认是 **identity source（身份来源）**，不是普通风格参考或灵感参考
- 目标是生成“同一位真实人物在新场景中被拍到”，不是机械复制参考图脸部
- 避免在默认模式使用过硬表达：`100% 像`、`五官完全不变`、`容貌完全不变`、`表情完全一致`
- 推荐默认表达：`保持身份级辨识度，同时允许表情、眼神、脸部肌肉、光影和透视自然适配新场景`
- **必须稳定**：face shape（脸型比例）、skull proportions（头颅比例）、hairline（发际线趋势）、brow relationship（眉眼关系）、eye shape and spacing（眼睛形状与眼距）、nose bridge and tip structure（鼻梁与鼻头结构）、lip morphology（唇形特征）、jawline（下颌线）、chin line（下巴线条）、cheekbone structure（颧骨）、forehead（额头）、skin tone type（肤色类型）、visible ethnic appearance features（可见人种/族裔外观特征）、facial bone structure（面部骨相）、age impression（年龄感）、subtle natural asymmetry（自然轻微不对称）、natural skin texture（自然皮肤纹理）、overall personal vibe（整体气质）
- **允许自然变化**：表情、眼神、眼睑状态、嘴角、脸颊肌肉、鼻翼、下巴、颈部肌肉、皮肤高光、阴影形变、镜头透视、柔焦或胶片质感造成的细节损失
- **可以改变**：服装、姿态、场景、光线、构图、艺术风格、表情、动作
- **如用户明确要求改变发型**：只改变发型样式，不改变 hairline, forehead proportions, skull contour, face shape 和身份级五官关系
- **脸部可见性**：除非用户明确要求远景、背影或遮挡，人物脸部应清晰可见、无遮挡、不过度侧脸，并在画面中占足够比例
- **自然优先**：相似度不能以牺牲表情真实性为代价；避免贴脸感、面具脸、换脸感和证件照式僵硬
- **年龄处理**：普通换场景/换装任务应保持参考图年龄感；只有涉及亲密、性感、暧昧、暴露、情侣互动等敏感场景时，才加入“确认均为成年人”的安全约束

### 语言选择

身份约束优先使用英文，非身份内容可用中文。

- 身份锚点关键词（face shape, jawline, eye spacing, nose bridge, lip morphology, cheekbone structure, hairline, skin tone, age impression）在英文训练数据中映射更精确，生成结果更稳定。
- 场景、光线、氛围、服装、构图可用中文或英文，不影响身份一致性。
- 严格保脸模式、身份修复模式、身份图+风格图隔离模式：身份约束必须英文。
- 默认 Natural Identity Mode：身份锚点中英文混写也可，但核心身份词建议英文。

Negative Prompt 也应该用英文，因为主流模型对英文负面词有更强的排斥关联。

---

## 身份保留强度

不要所有任务都使用同一种身份强度。根据用户需求和失败情况选择模式。

### Natural Identity Mode（默认）

用于普通换场景、换装、真实照片、视频关键帧、自然肖像。

目标：

- 保持同一人物身份级辨识度
- 允许表情、眼神、脸部肌肉、光影、镜头角度自然适配新场景
- 避免贴脸感、面具脸、换脸感和证件照式僵硬

中英混写推荐写法：

```
使用上传的人物照片作为主要面部身份参考。
Use the uploaded portrait photo as the primary identity reference. Do not create a new person.

保持身份级辨识度：
Preserve face shape, skull proportions, hairline, brow relationship, eye shape and spacing,
nose bridge and tip structure, lip morphology, jawline, chin line, cheekbone structure,
forehead, skin tone type, visible ethnic appearance features, facial bone structure,
age impression, subtle natural asymmetry, natural skin texture, and overall personal vibe.

允许表情、眼神、嘴角、眼睑、脸颊肌肉、光影和镜头透视根据新场景自然变化。
The person should look like the same real individual naturally photographed in the new scene —
not the reference face pasted onto a new body or setting.
```

### Strict Face Preservation Mode（严格保脸模式）

仅在以下情况使用：

- 用户明确要求“保持脸不变 / 高度相似 / 95%像 / 不要换脸”
- 生成结果已经出现明显身份漂移
- 用户反馈“不像本人 / 变成陌生人 / 美化成别人”

目标：

- 使用上传的面部照片作为主要面部身份参考
- 保持极高面部相似度
- 不创建新人物
- 不改变核心面部结构

英文推荐写法（必须使用）：

```
Strict face preservation mode:
Use my uploaded portrait photo as the only identity reference.

Preserve only my real facial features, face shape, skull proportions, hairline,
brow relationship, eye shape and spacing, nose bridge and tip structure,
lip morphology, jawline, chin line, cheekbone structure, forehead, skin tone,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.

Do not create a new person. Do not replace me with a similar-looking person.
Do not beautify me into someone else.
Target facial similarity: 95-100%.

Do not change facial structure. Do not redesign facial features.
Do not change skin tone type. Do not change age impression.
Allow expression, gaze, eyelids, corners of mouth, cheek muscles,
skin highlights, shadows, and perspective to naturally adapt to the current scene.
Do not paste the original expression or original facial lighting from the reference photo onto the new image.
```
```

### Repair Mode（身份修复模式）

当用户反馈“不像本人 / 换脸 / 变成网红脸 / 美化成别人 / 身份错了”时使用。

英文推荐写法（必须使用）：

```
Repair mode — strict face preservation:
Use my uploaded portrait photo as the only identity reference.

Do not create a new person. Do not replace me with a similar-looking person.
Do not beautify me into someone else.
Target facial similarity: 95-100%.

Preserve the same eyes, same nose, same lips, same jawline, same cheekbones,
same forehead, same face shape, same facial proportions, same skin tone,
same age impression, same visible ethnic appearance features,
same natural skin texture, and same recognizable identity.

Reduce beautification, template faces, beauty filters, and excessive symmetry.
Keep the same person, but let expression and lighting naturally adapt to the current scene.
Avoid pasted face look.
```
```

---

## 身份一致与自然适配

参考图提供的是人物身份，不是要复制原图里的固定表情、原始光影或面部边缘。

生成 prompt 时必须同时包含两类约束：

### 身份级锚点

- 保持同一人物的 face shape, brow relationship, nose structure, lip morphology, jawline, cheekbone structure, forehead, skin tone type, age impression, overall personal vibe
- 保持可识别为参考图中的同一位真实人物
- 不要变成相似人物、替代人物、模板脸或融合脸

### 场景级适配

- 允许眼神、眼睑、嘴角、脸颊、鼻翼、下巴、颈部肌肉和皮肤状态根据新表情、新光线、新姿态、新镜头角度自然变化
- 允许强光、逆光、柔焦、胶片颗粒、运动模糊、浅景深改变脸部细节呈现
- 人物应像真实处在新场景中，而不是参考图脸部被粘贴到新画面上

推荐写法：

```
Preserve the same person''s recognizable identity — do not mechanically copy the reference expression.
The person should look like the same real individual naturally photographed in the new scene.
Allow facial muscles, gaze, corners of mouth, cheeks, and eye-area details to adapt naturally
to the new expression, lighting, pose, and camera angle.
Avoid pasted face look, mask-like face, face-swap feel, stiff expression, and ID-photo frozen face.
Identity must be stable. Expression must be alive.
```

---

## 身份图 / 风格图隔离

当用户同时提供“人物身份参考图”和“风格/场景/构图参考图”时，必须明确隔离参考图用途。

### 核心规则

- 上传的人物肖像、自拍、头像、清晰人脸图 = only identity source
- 风格参考图 = visual style, clothing, scene, composition, lighting, camera angle, mood only
- 不要使用风格参考图中人物的脸、五官、肤色、发型、年龄感或身份
- 不要把身份参考图和风格参考图的人脸混合
- 如果风格参考图中也有人，必须明确：只参考其姿势、服装、场景、构图、光线和情绪，不参考其脸

### 英文推荐写法（必须使用）

```
Use my uploaded portrait photo as the only identity reference.
Preserve only my real facial features, face shape, skin tone, hairstyle,
hairline, and overall personal vibe from the uploaded portrait.

Do not use the face of the person in the reference image.
Do not use the facial features, skin tone, hairstyle, age impression,
or identity of any person in the style/reference image.

All other elements — including visual style, clothing, scene, composition,
lighting, and mood — should follow the reference photo.

The result should show me naturally placed into the new scene,
not a face swap, pasted face, collage, or blended identity.
```
```

---

## 多参考图隔离原则

当有多张参考图时，必须先判断每张图的用途：

- 身份参考图：只提供人物身份
- 姿势参考图：只提供姿态、动作、肢体方向和互动关系
- 风格参考图：只提供色彩、质感、光影、构图语言和艺术风格
- 服装参考图：只提供服装款式、材质、颜色、剪裁和搭配
- 场景参考图：只提供环境、背景、空间结构、道具和氛围

如果用户上传“我的头像/肖像/自拍”并要求参考另一张图片的风格、场景或构图：

```
Use the uploaded portrait photo as the only identity source.
Do not use the face of the person in the style/reference image.
All other elements — including visual style, clothing, scene, composition,
lighting, and mood — should follow the style/reference image.
```

风格/场景/姿势/服装参考图中的人物不能污染身份参考：

- 不继承其脸型、五官、肤色、发型、年龄感或身份
- 不与身份参考图混脸
- 不生成融合脸
- 不产生 face swap look、pasted face 或 collage look

---

## 妆容与肤色一致性

当用户要求化妆、时尚造型或写真风格时：

- 妆容可以改变色彩、光泽、腮红、眼线、睫毛、唇部质感和高光
- 妆容不能改变人物身份、五官比例、眉眼关系、鼻子结构、唇形、脸型、肤色类型和年龄感
- 眉毛应匹配参考人物原本的眉形和眉骨关系，不要重画成模板眉
- 保留真实皮肤纹理、可见毛孔、轻微肤色不均和自然面部细节
- 面部、颈部、手部和身体之间的肤色应自然平衡，不能出现脸白身体暗、脸和手肤色不一致的问题

推荐写法：

```
Makeup can include soft glowing skin, light peach blush, subtle highlights,
fine eyeliner, natural lashes, and healthy glossy lips.
But brow shape, facial feature proportions, skin tone type, age impression,
and facial identity must match the reference person.
Preserve visible pores, real skin texture, and subtle skin tone unevenness.
Maintain natural, balanced skin tone across face, neck, hands, and body.
```

---

## 反美化偏差约束

图像模型有明显的“默认美化”和“模板脸”倾向。即使参考图清晰，生成时也可能朝流行审美、过度对称脸、塑料皮肤方向漂移。

### 通用反偏差写法

以下写法适用于任何人种参考图，不预设参考图人物的人种或地域特征。

```
Anti-template face:
Do not generate: AI influencer face, template beauty face, idol face, doll face,
anime face, baby face, overly symmetrical face, plastic skin, fantasy template face.

Anti-beautification:
Do not redesign into a stranger''s face.
Do not change ethnic appearance features, skin tone type, age impression,
or identity-level facial feature relationships.
Do not make eyes larger. Do not deepen double eyelids.
Do not raise the nose bridge. Do not sharpen the nose tip.
Do not sharpen the chin. Do not make the face shape smaller.
Do not make skin whiter, more even, or smoother.
Do not push toward any templated popular aesthetic direction.
Do not over-symmetrize. Real human faces should retain subtle natural asymmetry.

Allow natural variation:
Allow real expression and real lighting to bring natural changes:
eyes may slightly narrow with expression or strong light,
corners of the mouth may relax naturally,
cheeks may be sculpted by light and shadow,
skin may show subtle redness in highlights or lose some detail.

Authenticity anchor:
Preserve the real recognizable identity of the person in the reference photo,
even if it does not conform to mainstream beauty standards.
Preserve subtle natural asymmetry.
Preserve authentic eyes, realistic nose, realistic lips,
realistic skin texture, and natural human expressions.
```

---

## 可选负面词库

当模型容易使用错误人脸、混合参考图人脸或出现贴脸感时，可加入以下英文负面词：

```
wrong identity, different person, fake face, face swap look, pasted face,
collage look, blended identity, mixed facial features, distorted facial features,
bad eyes, unnatural hair, messy hair clumps, overexposed face, blurry face,
plastic skin, overly smooth skin, doll-like face, excessive beauty filter
```

当输出不需要文字或水印时，可加入：

```
watermark, logo, text, Chinese characters, Doubao watermark, AI watermark,
anime, cartoon, illustration
```

当场景需要排除现代元素时：

```
modern building, modern clothes, sci-fi style, fantasy armor
```

---

## 单人模板

```
请根据第1张参考图生成新图，人物为 [P1]。

[核心优先级]
最高优先级是「同一人物身份一致性 + 当前场景中的自然表达」。
摄影风格、光线、滤镜、色调、服装和场景都不能改变人物身份。
但不要机械复制参考图表情，人物应像同一个人在新场景中被真实拍到。

[身份锚点]
[P1] 必须是第1张参考图中的同一位真实人物，不是相似人物、替代人物或重新设计的人脸。
Use the uploaded portrait photo as the only identity reference. Do not create a new person.

保持身份级辨识度：
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.

不要机械复制参考图中的固定表情、原始光影或僵硬脸部状态。
允许眼神、眼睑、嘴角、脸颊、鼻翼、下巴、颈部肌肉和皮肤细节根据当前光线、姿态、镜头角度和情绪自然变化。
The person should look like the same real individual naturally photographed in the new scene —
not the reference face pasted onto a new body or setting.

[自然表情适配]
表情要与当前场景一致，不要机械复刻参考图表情。
眼神不要死板，嘴角、眼睑、脸颊和颈部肌肉应有自然微变化。
强光、逆光、柔焦、胶片颗粒或浅景深可以自然影响脸部边缘和细节。
脸部应有真实呼吸感、微表情和拍摄瞬间的不确定性。
Identity must be stable. Expression must be alive.

[避免贴脸感]
不要把参考图的原始表情、原始脸部光影或原始五官边缘硬贴到新图里。
Avoid mask-like face, face-swap feel, stiff expression, overly symmetrical face, AI fake face.
不要让脸部比身体、光影、镜头质感和场景更清晰或更数码。

[反美化偏差]
不要重设计成陌生人脸，不要网红脸、偶像脸、娃娃脸、动漫脸、过度对称脸或塑料皮肤。
不要明显改变眼睛、鼻子、嘴唇、脸型、肤色类型和年龄感。
不要把眼睛画得更大，不要把鼻梁画得更高，不要把下巴画得更尖，不要把脸型画得更小，不要把肤色画得更白或更均匀。
但允许真实表情和真实光影带来的自然变化。

[可变内容]
场景：[场景描述]
服装：[新服装描述]
发型：[默认保留原发型 / 如用户明确要求则写新发型描述]
表情：[新表情描述]
姿态：[姿态描述]

[画面要求]
风格：[摄影 / 电影感 / 杂志 / 写实 / 胶片 / 插画 / 其他风格]
光线：[光线描述]
构图：[近景 / 半身 / 全身]
脸部：脸部清晰可见、无遮挡、不过度侧脸、不过远；清晰度应符合整体镜头质感。
画质：真实皮肤质感，自然面部细节，高质量摄影质感。
不要 AI 假脸，不要过度磨皮，不要重设计五官。

[Negative Prompt]
wrong identity, different person, fake face, face swap look, pasted face,
collage look, blended identity, plastic skin, overly smooth skin,
doll-like face, excessive beauty filter
```

---

## 身份图 + 风格图模板

```
请根据上传参考图生成新图。
身份参考图 = [P1]。
风格/场景/构图参考图 = [StyleRef]。

[身份来源]
Use the uploaded portrait photo [P1] as the only identity reference.
[P1] 必须是身份参考图中的同一位真实人物，不是相似人物、替代人物或重新设计的人脸。

Preserve only the real facial features, face shape, skin tone, hairstyle characteristics,
hairline, age impression, natural skin texture, and overall personal vibe from [P1].

[禁止身份污染]
Do not use the face of the person in [StyleRef].
Do not use the facial features, skin tone, hairstyle, age impression,
or identity of any person in the style/reference image.
不要把 [P1] 和 [StyleRef] 中的人脸混合。
不要生成 face swap look, pasted face, collage, or blended identity.

[可继承内容]
All other elements — including visual style, clothing, scene, composition,
lighting, camera angle, and mood — should follow [StyleRef].
风格参考图只用于 visual style, clothing, scene, composition, lighting, camera angle, and mood.

[自然适配]
The result should show [P1] naturally placed into the new scene, not a face swap.
允许表情、眼神、嘴角、脸颊、眼睑、头发动态、光影和镜头透视根据新场景自然变化。
Identity must be stable. Expression must be alive.

[Negative Prompt]
wrong identity, different person, fake face, face swap look, pasted face,
collage look, blended identity, mixed facial features, distorted facial features,
plastic skin, overly smooth skin, doll-like face, excessive beauty filter
```

---

## 双人合照模板

```
请根据第1张和第2张参考图生成一张双人合照。
第1张参考图 = [P1]，第2张参考图 = [P2]。

[核心优先级]
本次生成的最高优先级是「参考图人物身份一致性 + 当前互动中的自然表情」。
[P1] 和 [P2] 必须分别是各自参考图中的同一位真实人物，不是相似人物或融合人物。
摄影风格、光线、滤镜、色调、服装和场景都不能改变人物身份。
但不要机械复制参考图表情，两人应像真实处在当前互动中。

[P1 身份锚点]
[P1] 必须是第1张参考图中的同一位真实人物。
保持身份级辨识度：
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.
默认保留发型、发际线和头颅轮廓；如用户明确要求换发型，只改变发型样式，不改变脸型、发际线趋势、额头比例和身份级五官关系。
服装：[P1新服装] | 表情/姿态：[P1表情姿态] | 位置：[P1位置]

[P2 身份锚点]
[P2] 必须是第2张参考图中的同一位真实人物。
保持身份级辨识度：
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.
默认保留发型、发际线和头颅轮廓；如用户明确要求换发型，只改变发型样式，不改变脸型、发际线趋势、额头比例和身份级五官关系。
服装：[P2新服装] | 表情/姿态：[P2表情姿态] | 位置：[P2位置]

[身份隔离]
[P1] 的身份只能来自第1张参考图。
[P2] 的身份只能来自第2张参考图。
不要把两人的五官、脸型、肤色、发型、服装、站位或身体互相混合。
不要生成介于 P1 和 P2 之间的融合脸。
不要让两人变成相似脸、模板脸或同一张脸的变体。

[表情与互动适配]
[P1] 和 [P2] 必须保持各自身份一致，但表情和面部肌肉应自然响应当前互动。
不要让两人的脸像静态参考图贴在新画面上。
眼神方向、嘴角、脸颊、眼睑和颈部肌肉应符合当前姿态、距离、光线和情绪。
不要为了相似度牺牲表情真实性。
Identity must be stable. Expression must be alive.

[反美化偏差]
不要重设计成陌生人脸，不要网红脸、偶像脸、娃娃脸、动漫脸、过度对称脸或塑料皮肤。
不要明显改变眼睛、鼻子、嘴唇、脸型、肤色类型和年龄感。
不要把眼睛画得更大，不要把鼻梁画得更高，不要把下巴画得更尖，不要把脸型画得更小，不要把肤色画得更白或更均匀。
但允许真实表情和真实光影带来的自然变化。

[风格隔离]
所有摄影风格、光线、滤镜、色调、艺术风格只作用于光影、色彩、背景、材质和画面氛围。
绝对不改变面部五官、脸型、肤色类型、面部骨相、年龄感、发际线趋势和身份特征。
脸部清晰度应融入整体镜头质感，不要像换脸贴图一样过度清晰。

[画面内容]
两人的相对位置：[并排站立 / 一左一右 / 自然靠近 / 互相看向对方]
场景：[场景描述]
构图：[中景 / 半身 / 全身]
光线：[光线描述]
风格：[画面风格描述]
脸部：两人的脸部都清晰可见、无遮挡、不过度侧脸、不过远。

[防混淆]
[P1] 和 [P2] 的面孔、发型、服装、站位不能互换。
两人脸部都要清晰可见，不能融合成相似面孔。
保留真实辨识度，不要 AI 假脸，不要贴脸感，不要重设计五官。
```

---

## 风格迁移模板

```
请根据第1张参考图生成新图，人物为 [P1]，并应用指定艺术风格。

[身份锚点]
[P1] 必须是第1张参考图中的同一位真实人物，不是相似人物或风格化后重新设计的人脸。
保持身份级辨识度：
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.

[自然适配]
不要机械复制参考图表情。
允许表情、眼神、嘴角、脸颊、眼睑和皮肤细节根据当前风格、光线、姿态和镜头角度自然变化。
The person should look like the same individual naturally appearing in the requested style world —
not the reference face pasted into the artwork.

[风格作用范围]
风格只作用于色彩、材质、笔触、光影、背景、服装质感和整体画面语言。
The style must not change the person''s identity, face shape, facial feature proportions,
skin tone type, age impression, hairline, or facial bone structure.
即使是插画、动漫、3D、电影感、复古胶片或幻想风格，也必须保留同一人物的可识别脸部特征。
但允许风格造成合理的柔化、简化、光影变化和细节损失。

[风格描述]
风格：[风格描述]
场景：[场景描述]
服装：[服装描述]
构图：[构图描述]
脸部：脸部清晰可见、无遮挡、不过度侧脸、不过远；脸部细节应自然融入风格，不要贴脸。
```

---

## 安全审查友好写法

| 高风险表达 | 推荐替代表达 |
|-----------|-------------|
| 性感、诱惑、撩人 | 优雅、时尚、高级、自然自信 |
| 暧昧挑逗 | 浪漫氛围、温柔互动、自然亲近 |
| 接吻、嘴唇相触 | 近距离对视、额头轻靠、牵手、自然靠近 |
| 火辣身材 | 健康体态、修身剪裁、时尚造型 |
| 暴露、透视 | 简洁剪裁、轻盈材质、优雅礼服 |

**亲密场景**：默认改写为「浪漫、自然、优雅、非挑逗的近距离互动」。

**年龄不明确或偏年轻**：不生成亲密/性感/暧昧/暴露场景，先确认均为成年人。

**普通换场景/换装**：不主动加入“成年人”约束，避免改变人物年龄感；只要求保持参考图年龄感。

---

## Gotchas

- **默认模式不要用 95-100%**：`95-100%` 适合严格保脸或失败修复，默认任务使用会增加贴脸感和僵硬表情。
- **身份约束过硬导致假脸**：反复写“100% 像”“五官完全不变”“容貌完全不变”会导致贴脸感、面具脸和僵硬表情。应改为“身份级辨识度稳定，表情和光影自然适配”。
- **风格参考图污染身份**：当风格/场景参考图里也有人时，模型容易偷用那个人的脸。必须写明 `Do not use the face of the person in the style/reference image.`
- **脸部比场景更清晰**：如果脸像贴上去的，说明身份约束太硬或脸部清晰度与镜头质感不一致。应要求脸部自然融入光影、柔焦、颗粒、景深和曝光。
- **风格描述覆盖人物身份**：使用强烈艺术风格（如「复古胶片」「插画风」「动漫风」「3D」）时，五官会被风格同化。需明确加：「风格只作用于光线、色彩、材质、背景和画面语言，不改变人物身份特征」。
- **多人参考图中只有一位清晰主体**：如果参考图中有两人，模型无法确定 P1 指的是哪一位。每人应提供单独参考图。
- **大幅改变发型导致不像本人**：发型是重要身份锚点之一。大改发型时必须加强身份约束，并保护 hairline, forehead proportions, skull contour, face shape, brow relationship, jawline, nose.
- **夜景/侧脸/远景大幅降低相似度**：正脸+自然光参考图效果最好；侧脸+暗光时即使提示词正确，相似度仍明显下降。需要增加“脸部清晰可见、无遮挡、不过度侧脸、不过远”。
- **多参考图容易混脸**：必须明确身份、姿势、服装、背景、风格各自来自哪张图。人物身份不能跨参考图混合。
- **负向约束反向触发审查**：「不要色情、不要裸露」这种串本身可能触发审查。底部约束极简化，只保留「身份锚定 + 不要 AI 假脸 + 必要时确认成年人」。
- **英文负面词更有效**：`wrong identity, different person, fake face, face swap look, pasted face, collage look` 这些英文负面词比中文等价表达更能被模型排斥。

> 3人以上多人模板 → 读取 `references/templates.md`
> 失败修复提示词 → 读取 `references/fix-recipes.md`
> 参考图质量检查 → 读取 `references/fix-recipes.md`

---

## 回答工作流（Agentic Protocol）

### Step 1：识别输入

| 用户输入 | 处理方式 |
|---------|----------|
| 1张参考图 + 换场景/换装 | 单人模板，默认 Natural Identity Mode |
| 1张参考图 + 明确要求“脸完全一致/95%像/不要换脸” | Strict Face Preservation Mode |
| 2张参考图 + 合照需求 | 双人合照模板 |
| 3+张人物参考图 | 读取 `references/templates.md` 多人模板 |
| 人物肖像 + 风格/场景/构图参考图 | 身份图 + 风格图模板 |
| 提到 P1/P2 | 按上传顺序建立人物对应 |
| 只说"生成合照"但没说场景 | 给3个安全场景选项，或默认「自然电影感合照」 |
| 涉及亲密互动 | 改写为「浪漫、自然、优雅、非挑逗的近距离互动」 |
| 年龄不明确或偏年轻 | 不生成亲密/性感/暧昧/暴露场景，先确认均为成年人 |
| 提到风格迁移/转绘/动漫/插画/3D | 使用风格迁移模板，并加强“风格不改变身份” |
| 用户反馈“脸像但很假/贴脸/表情僵硬” | 使用自然适配修复逻辑 |
| 用户反馈“不像本人/换脸/变成别人” | 使用 Repair Mode |

### Step 2：构建提示词

1. 每个人物独立段落，使用 `[P1]` `[P2]` `[PN]` 标注
2. 每人先写身份锚点，再写表情/光影/场景适配，最后写可变内容
3. 身份约束核心词必须英文（face shape, jawline, eye spacing, nose bridge 等）
4. 明确写“同一位真实人物在新场景中被拍到”，不要只写“像”或“完全不变”
5. 场景、光线、构图、风格单独成段
6. 多人图必须加防混淆约束
7. 人物参考图只用于身份锚定；风格、姿势、服装、背景参考必须与身份参考分离
8. 当存在身份图 + 风格图时，必须写明：`Do not use the face of the person in the style/reference image.`
9. 默认加入脸部清晰度约束：脸部清晰可见、无遮挡、不过度侧脸、不过远
10. 如果改变发型，必须保护 hairline, forehead proportions, skull contour, face shape 和身份级五官关系
11. 加入自然表情适配：眼神、嘴角、脸颊、眼睑、颈部肌肉应符合当前场景
12. 只有严格保脸或失败修复时才使用 `95-100% facial similarity`
13. 末尾加 Negative Prompt（英文）+ 人物一致性 + 自然适配 + 安全约束块

### Step 3：自检

- [ ] 上传顺序与 P1/P2 对应关系是否明确？
- [ ] 每个人物是否都有独立身份锚点？
- [ ] 身份约束核心特征词是否用了英文？
- [ ] 是否明确写了“同一位真实人物在新场景中被拍到”？
- [ ] 默认模式是否避免了“100% 像 / 完全不变 / 五官完全复制”等过硬表达？
- [ ] 严格保脸/失败修复模式是否加入 `95-100%`、不要创建新人物、不要改变面部结构？
- [ ] 是否保护 face shape, brow relationship, nose structure, lip morphology, jawline, cheekbone structure, forehead, skin tone type, age impression？
- [ ] 是否允许表情、眼神、嘴角、脸颊、眼睑根据场景自然变化？
- [ ] 是否避免面具脸、换脸感、僵硬表情和证件照式固定脸？
- [ ] 脸部清晰度是否与整体镜头质感一致，避免脸比场景更数码？
- [ ] 如果有风格/场景参考图，是否明确禁止使用其中人物的人脸？
- [ ] 是否避免把“成年人”写进普通身份锚点导致年龄漂移？
- [ ] 如果改变发型，是否保护了 hairline, forehead proportions, skull contour, face shape 和身份级五官关系？
- [ ] 是否避免使用会预设人种方向的偏差词？
- [ ] 人脸是否要求清晰可见、无遮挡、不过远、不过度侧脸？
- [ ] 多人图是否写明站位、服装、面部朝向？
- [ ] 多人图是否加入防止面孔、服装、站位互换的约束？
- [ ] 多参考图时，身份参考和风格/姿势/服装/背景参考是否隔离？
- [ ] 是否加入英文 Negative Prompt？
- [ ] 是否避免裸露、性暗示、低龄化、强迫感？

---

## 失败修复方向

当生成结果“不像本人”时：

```
Repair mode — strict face preservation:
Use my uploaded portrait photo as the only identity reference.

Do not create a new person. Do not replace me with a similar-looking person.
Do not beautify me into someone else.
Target facial similarity: 95-100%.

Preserve the same eyes, nose, lips, jawline, cheekbones, forehead,
face shape, facial proportions, skin tone, age impression,
visible ethnic appearance features, natural skin texture, and recognizable identity.

Face must be clearly visible, unobstructed, not in strong profile, not too far.
```

当生成结果“用了风格图里的人脸”时：

```
Repair mode — identity contamination:
Use the uploaded portrait photo as the only identity source.
Do not use the face, facial features, skin tone, hairstyle, age impression,
or identity of any person in the style/reference image.

The style/reference image is for visual style, clothing, scene, composition,
lighting, and mood only.
Do not blend identities. Do not create a blended identity,
face swap look, pasted face, or collage look.
```

当生成结果“脸像但很假 / 贴脸感”时：

```
Repair mode — natural expression adaptation:
Preserve the same person''s recognizable identity,
but do not mechanically copy the reference photo expression.
The person should look like the same real individual naturally photographed in the new scene —
not the reference face pasted onto a new body or setting.

Preserve identity-level features: face shape, brow relationship, nose structure,
lip morphology, jawline, cheekbone structure, forehead, skin tone type,
age impression, and overall personal vibe.
Allow expression, gaze, eyelids, corners of mouth, cheeks, nostrils, jaw,
neck muscles, and skin highlights to naturally adapt to the current lighting,
pose, camera angle, and emotion.

Lower pasted face feel, mask-like face, face-swap feel, and ID-photo stiffness.
Let facial details blend naturally into the lighting, film texture, soft focus,
depth of field, and scene atmosphere.
Identity must be stable. Expression must be alive.
```

当生成结果“过度美化”时：

```
Repair mode — anti-beautification:
Do not redesign into a stranger''s face.
Do not make into template face, overly symmetrical face, or plastic skin.
Do not make eyes larger. Do not raise the nose bridge.
Do not sharpen the chin. Do not whiten or over-smooth the skin.
Preserve real skin texture, subtle natural asymmetry,
and the original recognizable identity from the reference photo.
Allow natural variation from real expression and real lighting,
but do not change the person''s identity.
```

当多人图“混脸/换脸/站位混乱”时：

```
Repair mode — identity isolation:
[P1]''s identity comes only from reference image 1.
[P2]''s identity comes only from reference image 2.
Do not swap faces, hairstyles, clothing, skin tone, positions, or expressions.
Do not create a blended face.
Each person''s face must be clearly visible and preserve the recognizable identity
from their respective reference photo.
Each person''s expression may naturally adapt to the interaction,
but identities must not be mixed.
```

---

## 诚实边界

- 实际效果取决于平台对参考图的权重处理（GPT Image 2 / Seedance / 即梦等各不同）
- 多人场景时，人物越多，单个人物的容貌精准度越难保证
- 参考图质量直接决定生成上限，低清、遮挡、侧脸、暗光、远景图会显著降低一致性
- 强风格化会天然降低脸部精确度，需要额外加强身份锚点
- 身份约束过硬会导致贴脸感、面具脸和僵硬表情，需要加入自然适配约束
- 身份图 + 风格图任务中，风格图里的人脸很容易污染身份，必须明确排除
- 英文身份约束（face shape, jawline, eye spacing 等）比中文映射更精确稳定
- 本 Skill 不用于生成未成年人的换装、亲密、性感化场景

---

> 本 Skill 基于 image-prompt-master 方法论扩展
> 创建时间：2026-05-23 | 审核优化：2026-05-28