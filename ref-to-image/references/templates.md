# 扩展模板

> 读取条件：需要多人模板（3人以上）或完整示例时。

---

## 多人模板（3人以上）

```
请根据上传顺序生成一张[N]人同框图。
第1张=[P1]，第2张=[P2]，第3张=[P3]，以此类推。

[核心优先级]
最高优先级是「多人身份一致性」。
每个人都必须是各自参考图中的同一位真实人物，不是相似人物、替代人物或融合人物。
所有摄影风格、光线、滤镜、色调、服装和场景都必须让位于身份相似度。

[P1] 身份锚点：
[P1] 必须是第1张参考图中的同一位真实人物。
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.
默认保留发型、发际线和头颅轮廓；如换发型只改变样式，不改变 hairline, forehead proportions, skull contour, face shape 和身份级五官关系。
服装：[P1服装] | 表情/姿态：[P1表情姿态] | 位置：[P1位置] | 面部朝向：[正脸/轻微侧脸]

[P2] 身份锚点：
[P2] 必须是第2张参考图中的同一位真实人物。
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.
默认保留发型、发际线和头颅轮廓；如换发型只改变样式，不改变 hairline, forehead proportions, skull contour, face shape 和身份级五官关系。
服装：[P2服装] | 表情/姿态：[P2表情姿态] | 位置：[P2位置] | 面部朝向：[正脸/轻微侧脸]

[P3] 身份锚点：
[P3] 必须是第3张参考图中的同一位真实人物。
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip structure, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
visible ethnic appearance features, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and overall personal vibe.
默认保留发型、发际线和头颅轮廓；如换发型只改变样式，不改变 hairline, forehead proportions, skull contour, face shape 和身份级五官关系。
服装：[P3服装] | 表情/姿态：[P3表情姿态] | 位置：[P3位置] | 面部朝向：[正脸/轻微侧脸]

如有更多人物，继续按同样结构添加 [P4]、[P5]、[PN]。

[身份隔离]
[P1] 的身份只能来自第1张参考图。
[P2] 的身份只能来自第2张参考图。
[P3] 的身份只能来自第3张参考图。
不要把不同人物的五官、脸型、肤色、发型、服装、站位或身体互相混合。
不要生成介于多个人之间的融合脸。
不要让不同人物变成相似脸、模板脸或同一张脸的变体。

[表情与互动适配]
每个人都必须保持各自身份一致，但表情、眼神和面部肌肉应自然响应当前互动。
不要让人物脸部像静态参考图贴在新画面上。
不要为了相似度牺牲表情真实性。
Identity must be stable. Expression must be alive.

[多人防混淆]
每个人必须清楚对应自己的参考图。
不要交换任何人的脸、服装、发型、站位、身体、表情或面部朝向。
每个人脸部都要清晰可见、无遮挡、不过度侧脸、不过远。
避免人物脸部过小、模糊、遮挡、背脸或彼此相似化。

[反美化偏差]
Do not redesign into a stranger''s face. Do not template face, idol face, doll face, anime face, overly symmetrical face or plastic skin.
Do not make eyes larger, do not raise nose bridge, do not sharpen chin, do not whiten or over-smooth skin.
Do not push toward any templated popular aesthetic direction.
Preserve each person''s real recognizable identity and subtle natural asymmetry.

[风格隔离]
所有摄影风格、光线、滤镜、色调、艺术风格只作用于光影、色彩、背景、材质和画面氛围。
绝对不改变任何人物的五官、脸型、肤色类型、面部骨相、年龄感、发际线趋势和身份特征。

[画面内容]
场景：[场景描述]
互动：[人物互动方式]
构图：[中景 / 半身 / 全身；尽量让每个人脸部清晰可见]
风格：[摄影 / 电影感 / 写实 / 杂志 / 其他风格]
光线：[光线描述]

[安全与真实感]
保持参考图年龄感。
如果涉及亲密、暧昧、性感、暴露或情侣互动，先确认所有人物均为成年人。
画面自然优雅、非挑逗。
不要 AI 假脸，不要过度磨皮，不要重设计五官。

[Negative Prompt]
wrong identity, different person, fake face, face swap look, pasted face,
collage look, blended identity, mixed facial features, distorted facial features,
bad eyes, unnatural hair, messy hair clumps, overexposed face, blurry face,
plastic skin, overly smooth skin, doll-like face, excessive beauty filter
```

---

## 容貌保留关键参数

| 特征 | 英文关键词 | 注意事项 |
|------|----------|----------|
| 脸型轮廓 | face shape | 最重要的身份锚点之一 |
| 头颅比例 | skull proportions | 换发型时尤其要保护 |
| 发际线 | hairline | 换发型时容易导致不像本人 |
| 眉眼关系 | brow relationship | 比单独写"大眼睛"更稳定 |
| 眼睛 | eye shape and spacing | 避免把眼睛统一放大 |
| 鼻子 | nose bridge and tip | 不要默认高鼻梁化 |
| 嘴唇 | lip morphology | 避免网红唇 |
| 下颌线 | jawline | 避免自动 V 脸化 |
| 下巴线条 | chin line | 下巴比例对辨识度影响大 |
| 颧骨结构 | cheekbone structure | 对真人辨识度影响很大 |
| 额头 | forehead | 发际线配合保护 |
| 肤色类型 | skin tone type | 可受光线影响，但不改变肤色类型 |
| 可见人种/族裔特征 | visible ethnic appearance features | 不重新解释 |
| 皮肤纹理 | natural skin texture | 防止塑料皮肤和 AI 假脸 |
| 年龄感 | age impression | 普通任务不要强行写成年人，避免年龄漂移 |
| 自然轻微不对称 | subtle natural asymmetry | 防止 AI 过度对称导致假脸 |
| 整体气质 | overall personal vibe | 连接所有身份特征的纽带 |

---

## 多参考图用途隔离模板

```
如果同时提供人物图、姿势图、服装图、场景图或风格图，请按用途隔离：

[身份参考]
[P1] 身份只来自第1张人物参考图。
[P2] 身份只来自第2张人物参考图。
[P3] 身份只来自第3张人物参考图。

[姿势参考]
姿势参考图只用于身体姿态、动作方向、手部位置和人物互动。
不要从姿势参考图继承脸型、五官、肤色、年龄感或身份。

[服装参考]
服装参考图只用于服装款式、颜色、材质、剪裁和搭配。
不要从服装参考图继承脸型、五官、肤色、年龄感或身份。

[场景参考]
场景参考图只用于环境、背景、空间结构、道具和氛围。
不要从场景参考图继承人物身份。

[风格参考]
风格参考图只用于色彩、光影、质感、构图语言和艺术风格。
Do not use the face of the person in the style reference image.
不要用风格参考图重设计人物五官、脸型、肤色或年龄感。
```

---

## 常用场景示例

### 双人街头合照

```
请根据参考图生成一张电影感街头合照。
第1张参考图=[P1]，第2张参考图=[P2]。

[核心优先级]
最高优先级是身份一致性。
[P1] 和 [P2] 必须分别是各自参考图中的同一位真实人物，不是相似人物或融合人物。

[P1] 身份锚点：
[P1] 必须是第1张参考图中的同一位真实人物。
Preserve face shape, facial proportions, brow relationship, eye shape,
nose bridge and tip, lip morphology, jawline, skin tone type, facial bone structure,
age impression, and real recognizable identity.
服装：米白色简约针织上衣，高腰裤
表情：温柔微笑，眼神自然
位置：画面左侧

[P2] 身份锚点：
[P2] 必须是第2张参考图中的同一位真实人物。
Preserve face shape, facial proportions, brow relationship, eye shape,
nose bridge and tip, lip morphology, jawline, skin tone type, facial bone structure,
age impression, and real recognizable identity.
服装：简约深色外套
表情：温柔微笑，自然放松
位置：画面右侧

两人并排站立，距离自然亲近，肩并肩，不刻意摆拍。
场景：城市街头傍晚，暖色灯光，背景虚化，行人模糊。
高端摄影质感，电影感，柔和自然光，浅景深，35mm镜头感。

[P1] 的身份只能来自第1张参考图。
[P2] 的身份只能来自第2张参考图。
不要交换面孔、发型、服装、站位或身体。
不要生成融合脸，不要模板化美化，不要 AI 假脸。
两人脸部都要清晰可见、无遮挡、不过度侧脸、不过远。
```

### 单人换装换场景

```
请根据第1张参考图生成新图，人物为 [P1]。

[核心优先级]
最高优先级是身份一致性。
[P1] 必须是第1张参考图中的同一位真实人物，不是相似人物或重新设计的人脸。
Use the uploaded portrait photo as the only identity reference. Do not create a new person.

[身份锚点]
Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip, lip morphology, jawline, chin line,
cheekbone structure, skin tone type, facial bone structure, age impression,
subtle natural asymmetry, natural skin texture, and real recognizable identity.

[可变内容]
新场景：日式居酒屋，暖黄灯光，木质装饰
新服装：日式和风棉麻连衣裙，淡蓝色
新表情：放松微笑，端着清酒杯
姿态：侧坐，自然优雅

[画面要求]
高端杂志摄影风格，温暖灯光，浅景深，真实摄影感。
脸部清晰可见、无遮挡、不过度侧脸、不过远。
不要变成陌生人，不要模板化美化，不要过度磨皮，不要 AI 假脸。
保留真实辨识度。
```

---

## 多人失败修复提示词

### 多人身份不像

```
Repair mode — multi-person strict face preservation:
Use each uploaded portrait photo as the only identity reference for its corresponding person.
Do not create a new person. Do not replace with a similar-looking person.
Do not beautify into someone else.
Target facial similarity: 95-100%.

[P1]''s identity comes only from reference image 1.
[P2]''s identity comes only from reference image 2.
[P3]''s identity comes only from reference image 3.

Reduce stylization, beautification, filters, and template face tendencies.
Preserve each person''s face shape, skull proportions, hairline, facial proportions,
brow relationship, nose bridge and tip, lip morphology, jawline, cheekbone structure,
skin tone type, age impression, and subtle natural asymmetry.

Each person''s face must be clearly visible, unobstructed, not in strong profile, not too far.
```

### 多人混脸或换脸

```
Repair mode — identity isolation:
[P1]''s identity comes only from reference image 1.
[P2]''s identity comes only from reference image 2.
[P3]''s identity comes only from reference image 3.

Do not swap anyone''s face, hairstyle, clothing, position, body, expression, or facing direction.
Do not create a blended face.
Do not let different people become similar faces, template faces, or variants of the same face.
Each person''s face must be clearly visible while preserving the recognizable identity
from their respective reference photo.
```

### 多人脸太小或不清晰

```
Repair mode — face visibility:
Re-generate. Composition must prioritize each person''s face being clearly visible.
Use medium shot or half-body framing. Avoid distant full-body wide shots.
Avoid back-facing, strong profile, sunglasses, hat brim blocking face,
hair covering face, or hands covering face.
Each person''s face should have sufficient image-area proportion,
with clear facial features and visible real skin texture.
```