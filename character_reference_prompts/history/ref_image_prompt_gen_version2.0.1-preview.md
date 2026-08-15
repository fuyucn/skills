---
name: ref-image-prompt-gen-v2
description: |
  参考图人像生成——2.0.1-preview。核心原则：环境描述尽情写（不影响身份），人物描述一个字都不写。身份一致性靠参考图权重和平台参数。
---

# ref_image_prompt_gen_version2.0.1-preview.md

## 2.0 的根本否定

**1.x 系列的问题是结构性的，不是修修补补能解决的。**

1.x 的核心假设：

> 只要在主提示词中写清楚「保持参考图身份」「不要重新设计脸」「不要替换成通用模特」，模型就会优先用参考图的面部信息，而文本安全地控制场景、服装、动作。

这个假设不成立。

**模型的实际行为规律是：**
文本描述占据模型的主要注意力——文字越具体，模型越照着文字画。
参考图是次要输入——随时可以被文字的细节程度覆盖。
身份锁定词是软约束——「do not redesign the face」是一句建议，比不上具体场景指令的权重。

**1.x 的修复方向也是错的：**
每个版本都在「加更多规则→写更多文字→生成更不像」的循环里。
1.2.5 的 8-shot 提示词写了超过 2000 词，身份锁定的权重不到 0.1%。

---

## 2.0.1 的核心修正

**2.0-preview 犯了另一个错误：把所有文字都当成了风险，不分类型。**

实际上：

| 文字类型 | 对身份的影响 | 策略 |
|---|---|---|
| 环境描述：墙面、光线、道具、质感、色彩、纹理 | 几乎零影响 | **尽情写，越具体越好** |
| 人物动作描述：身体关系、手部位置、姿势 | 中等影响 | **只写 1 个名词** |
| 人物表情/心理/气质描述 | 直接影响 | **一个字都不要写**（除发型锚点 + 1 个表情基调词） |

**2.0.1 的规则：**
- 环境和光线：不限长度。写得越具体，画面控制力越强，且不影响面容。
- 人物动作：每张只允许 1 个名词。
- 人物表情/心理/气质：完全禁止。只允许 1 个表情基调词作为氛围引导。

---

## 第一原则

> **环境影响不了脸。别省。**
> **每一次写人物，都在替换参考图。别写。**

---

## 生成流程

### Step 1：确定身份锚点

从参考图中提取 **不超过 2 个** 锚点词：

- 发型（例如：short pink bob）
- 一个表情基调词（例如：cold 或危险）

**注意：** 表情基调词只作为氛围引导，不是对表情的文字定义。写「cold」是告诉模型「整体气质往这个方向」，不是要求模型生成一个特定表情。

### Step 2：尽情展开环境描述

**不限长度。不限细节。** 场景控制靠文字，身份控制靠参数。

```
Rough dark grey-green concrete wall, hard on-camera direct flash,
blown-out highlights on white satin, deep shadows behind subject.
Champagne glass in extreme foreground as blurred obstruction.
Cream frosting on birthday cake, pearl luster catching flash.
Satin dress texture, wall grain in shadow areas.
Slight dust particles in the flash beam.
```

### Step 3：该张变化——只写 1 个构图词 + 1 个动作名词

```
Low angle, champagne glass foreground.
Overhead tabletop, cake in lower frame.
Ultra close, gloved hand over mouth.
```

**不加：** 表情描述、心理描写、身体动态展开、动作动机解释。

### Step 4：组装

```
--- 身份锚点（1 行）---
Use reference image. Same person. Short pink bob. Cold.

--- 环境尽情写（不限长度）---
......

--- 该张变化（1 行）---
[1 composition noun], [1 body/action noun]
```

---

## 词汇规则

### 环境类：不限

```
Rough textured dark grey-green concrete wall, hard on-camera direct flash,
blown-out highlights on white satin, deep shadows, cream frosting on cake,
pearl luster catching flash, satin sheen, dust particles in light beam,
champagne bubbles catching light, wax drips on candle, fork on plate,
crumbs scattered, wall grain visible in shadow areas.
```

写越多，画面控制越精确，且完全不危及面容。

### 人物动作类：每张只允许 1-2 个名词

```
Allowed: "hand on crown", "pearls near face", "champagne at waist"
Disallowed: "hand gliding across the table", "body leaning back with asymmetrical shoulders"
```

### 表情/心理/气质类：完全禁止

```
Disallowed: "smirk", "half-lidded eyes", "laughing", "defiant look",
"like she's about to", "cold confidence with a fragile undertone",
"bittersweet expression", "lips slightly parted"
```

唯一允许的是 Step 1 中确定的 1 个表情基调词。

---

## 平台参数优先级

身份一致性靠参数，不靠文字。文字只用来控制场景。

### Midjourney

```
--iw 2          (最大身份权重)
--sw 0          (最小风格权重)
--s 0           (最小风格化)
```

### SDXL / Flux (IP-Adapter)

```
IP-Adapter Face ID weight: 0.9-1.0
ControlNet: 仅控制姿势，不使用 reference-only 模式
```

---

## 渐进式策略

如果面容丢失，优先检查的是**人物相关词**，不是环境描述。

```
Run 1: 脸像了，但蛋糕不够具体
  → 加环境描述词（对身份零风险）

Run 1: 脸不像
  → 检查参考图质量
  → 检查是否写了人物动作/表情词并删除
  → 把身份参数推高

Run 3: 加了人物动作词后脸跑了
  → 退回该词之前的版本
  → 该动作词就是这个场景的敏感词
```

---

## Main Prompt 模板

```markdown
# Complete Image Generation Prompt

## Main Prompt

Use reference image. Same person. [hairstyle anchor]. [1 expression tone word].

[Environment description — no length limit.]
[Lighting, texture, color, props, atmosphere — write freely.]

[1 composition noun], [1 body/action noun].

## Negative Prompt

不同人, 脸变了, 通用美女脸, 塑料皮肤, 磨皮, 模糊脸, 面部细节丢失, 脸上柔焦, 脸太小, 甜笑, 温柔表情, 自然光, 柔光箱, 白背景, 干净背景, 精修, 水印, logo, 文字

## Reference Image Use

参考图是唯一身份来源。面部权重最高。

## Recommended Settings

Aspect ratio: 3:4 or as needed
Identity weight: maximum
Style weight: minimum
Skin texture: natural, not smoothed
```

---

## 2.0.1 的诚实边界

2.0.1 仍然是一个假设，不是真理。

**它能解决的问题：** 之前因为人物动作/表情/心理描写过多导致的身份丢失。

**它不能解决的问题：**
- 参考图本身质量差（模糊、脸小、强美颜、极端角度）
- 模型对 face reference 的支持差
- 跨平台的身份一致性差异

**测试它的方法：** 写一条 3 行身份锚点 + 不限长度环境的 prompt，运行。如果脸像了，说明之前的问题是人物词过多。如果脸还是不像，问题出在参考图质量或模型能力上。
