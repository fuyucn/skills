# 失败修复提示词

> 读取条件：生成结果出现问题时。

---

## 不像参考人物

```
Repair mode — strict face preservation:
Use my uploaded portrait photo as the only identity reference.

Do not create a new person. Do not replace me with a similar-looking person.
Do not beautify me into someone else.
Target facial similarity: 95-100%.

Preserve the same eyes, nose, lips, jawline, cheekbones, forehead,
face shape, facial proportions, skin tone, age impression,
visible ethnic appearance features, natural skin texture, and recognizable identity.

Reduce stylization, beautification, filters, and template face tendencies.
Face must be clearly visible, unobstructed, not in strong profile, not too far.
```

---

## 单人身份漂移

```
Repair mode — identity restoration:
[P1] must be the same real person from reference image 1, not a similar-looking person.

Use the uploaded portrait photo as the only identity reference.
Do not create a new person. Target facial similarity: 95-100%.

Preserve face shape, skull proportions, hairline, brow relationship,
eye shape and spacing, nose bridge and tip, lip morphology,
jawline, chin line, cheekbone structure, forehead, skin tone type,
facial bone structure, age impression, subtle natural asymmetry,
natural skin texture, and overall personal vibe.

Do not generate AI influencer face, template beauty face, idol face,
doll face, anime face, overly symmetrical face, plastic skin,
or a different identity from the reference photo.
```

---

## P1/P2 面孔混淆

```
Repair mode — identity isolation:
[P1]''s identity comes only from reference image 1.
[P2]''s identity comes only from reference image 2.

[P1] must be the same real person from reference image 1.
[P2] must be the same real person from reference image 2.

Do not swap anyone''s face, hairstyle, clothing, position, body, expression, or facing direction.
Do not create a blended face.
Do not generate a blended face between P1 and P2.
Do not let two people become similar-looking faces, template faces, or variants of the same face.
Both faces must be clearly visible, unobstructed, not in strong profile, not too far.
```

---

## 多人 P1/P2/P3 身份混淆

```
Repair mode — multi-person identity isolation:
最高优先级是多人身份一致性。
每个人都必须是各自参考图中的同一位真实人物，不是相似人物或融合人物。

Strictly isolate identity sources:
[P1]''s identity comes only from reference image 1.
[P2]''s identity comes only from reference image 2.
[P3]''s identity comes only from reference image 3.
如有更多人物，[P4]、[P5]、[PN] 也必须分别只来自各自对应参考图。

Do not swap anyone''s face, hairstyle, clothing, position, body, expression, or facing direction.
Do not blend facial features, face shapes, skin tones, hairstyles, or bodies across different people.
Do not let different people become similar-looking faces, template faces, or variants of the same face.

Each person''s face must be clearly visible, unobstructed, not in strong profile, not too far.
```

---

## 脸部变形或不清晰

```
Repair mode — face clarity:
Re-generate. Each person''s face must be complete, clear, natural, unobstructed, and undistorted.
Maintain realistic human facial structure with correctly positioned facial features.
Eyes, nose, lips, and jawline must be clearly distinguishable.
Avoid back-facing, strong profile, overly dark lighting, overly distant composition,
facial compression, facial features blurred together, or face blocked by hair/hands/props.
Use clearer frontal or slight three-quarter angle framing,
giving each face sufficient image-area proportion.
```

---

## 脸太小或构图过远

```
Repair mode — face prominence:
Re-generate. Prioritize face clarity and identity similarity.
Use close-up, medium close-up, or half-body framing. Avoid distant full-body wide shots.
Each person''s face should be clearly visible with sufficient image-area proportion
and distinguishable facial features.
Do not let faces be obscured by background, props, hair, hands, hat brim, sunglasses, or shadows.
```

---

## 过度美颜或 AI 感

```
Repair mode — anti-beautification:
Re-generate. Reduce beautification, skin smoothing, beauty filters, and template face tendencies.
Preserve real skin texture, natural pores, real facial details, and subtle natural asymmetry.
No plastic skin. No over-smoothing. No over-symmetrization.
Do not make eyes larger. Do not deepen double eyelids.
Do not raise the nose bridge. Do not sharpen the nose tip.
Do not sharpen the chin. Do not make the face shape smaller.
Do not make skin whiter or overly even.
Do not push toward any templated popular aesthetic direction:
no influencer face, idol face, doll face, anime face, or V-line face.
```

---

## 发型改变后不像本人

```
Repair mode — hairstyle change with identity preservation:
Re-generate. Allow the hairstyle to change but preserve the person''s identity.
Only change hair length, curl/straight texture, color, styling, or bangs pattern.
Must preserve hairline, forehead proportions, skull contour, face shape,
brow relationship, eye shape, nose bridge and tip, lip morphology,
jawline, cheekbone structure, skin tone type, age impression, and real recognizable identity.

Do not change face shape, facial feature proportions, age impression,
skin tone type, or overall identity because of a hairstyle change.
```

---

## 年龄感漂移

```
Repair mode — age impression preservation:
Re-generate. Preserve the age impression from the reference photo.
Do not make the person younger, more baby-faced, more mature, or older.
Do not add baby face, doll face, overly youthful skin, overly large eyes, or infantilized expressions.
For normal scene/outfit change tasks, do not force age changes.
For intimate, suggestive, sexy, or exposed scenes, first confirm all subjects are adults.
```

---

## 风格覆盖了人物身份

```
Repair mode — style identity separation:
Re-generate. Reduce the style''s impact on facial identity.
Style applies only to lighting, color, clothing, background, materials, brushwork, and image texture.
The style must not change facial features, face shape, skull proportions, hairline,
skin tone type, age impression, facial bone structure, or identity.

Even in illustration, anime, 3D, cinematic, vintage film, or fantasy styles,
the same real person''s recognizable facial features must be preserved.
```

---

## 姿势/服装/风格参考污染身份

```
Repair mode — reference image separation:
Re-generate. Strictly isolate reference image purposes:
人物参考图 only for identity.
姿势参考图 only for body pose, movement direction, hand placement, and interaction.
服装参考图 only for clothing style, color, material, cut, and coordination.
场景参考图 only for environment, background, spatial structure, props, and atmosphere.
风格参考图 only for color, lighting, texture, composition language, and artistic style.

Do not inherit face shape, facial features, skin tone, age impression,
or identity from pose, clothing, scene, or style reference images.
```

---

## 脸像但很假 / 贴脸感

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

---

## 审查不过

```
Repair mode — safety compliance:
保留身份锚定和画面核心意图，删除或改写高风险表达。
Change nudity, sexy, provocative, bed, strong body contact, body-part emphasis
into natural group photo, elegant styling, romantic atmosphere, gentle eye contact,
natural closeness, cinematic lighting, and high-end photographic composition.

Do not add negative strings like "no pornography, no nudity" — these may trigger review.
If the person''s age appears unclear or younger, do not generate intimate,
sexy, suggestive, or exposed scenes. First confirm all subjects are adults.
```

---

## 参考图质量检查

### 推荐参考图

- 正脸或轻微侧脸，脸部清晰无遮挡
- 自然光或均匀光线，避免过暗、强滤镜、强美颜
- 分辨率较高，五官、脸型、发际线和肤色类型可辨认
- 单人参考图中只有一个清晰主体
- 多人任务中，每个人最好单独提供一张清晰参考图
- 如果要换发型，最好提供能看清发际线、额头比例和脸型的参考图

### 低质量参考图风险

| 参考图问题 | 可能结果 | 建议 |
|-----------|----------|------|
| 墨镜/口罩/刘海遮眼 | 五官无法稳定保留 | 补充无遮挡正脸图 |
| 帽檐/手/道具遮脸 | 脸部结构缺失，生成漂移 | 补充无遮挡照片 |
| 强侧脸或背脸 | 正脸生成不像本人 | 补充正脸或三分之二侧脸图 |
| 低清/模糊/过暗 | 脸部漂移、AI感增强 | 换高清图 |
| 远景全身照 | 脸部信息不足，容易生成陌生脸 | 补充近景或半身照 |
| 参考图中多人同框 | 主体识别错误 | 明确指出 P1 是哪位，最好裁剪单人 |
| 夸张滤镜或重度美颜 | 生成结果像滤镜脸 | 提供自然光真实照片 |
| 强风格化参考图 | 风格覆盖身份，五官漂移 | 补充真实照片作为身份参考 |
| 年龄不明确或偏低龄 | 安全风险升高 | 不生成亲密、性感或暧昧场景 |
| 发际线被遮挡 | 换发型时容易不像本人 | 补充露出额头或发际线清晰的照片 |