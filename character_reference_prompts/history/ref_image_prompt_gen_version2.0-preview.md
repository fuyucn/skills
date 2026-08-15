---
name: ref-image-prompt-gen-v2
description: |
  参考图人像生成——2.0版。核心原则：「文字越少，脸越像」。极端最小化 Main Prompt，身份一致性靠参考图权重和平台参数，不靠文字约束。
---

# ref_image_prompt_gen_version2.0-preview.md

## 2.0 的根本否定

**1.x 系列的问题是结构性的，不是修修补补能解决的。**

1.x 的核心假设：

> 只要在主提示词中写清楚「保持参考图身份」「不要重新设计脸」「不要替换成通用模特」，模型就会优先用参考图的面部信息，而文本安全地控制场景、服装、动作。

这个假设不成立。

**模型的实际行为规律是：**

1. 文本描述占据模型的主要注意力——文字越具体，模型越照着文字画
2. 参考图是次要输入——随时可以被文字的细节程度覆盖
3. 身份锁定词是软约束——「do not redesign the face」是一句建议，比不上「champagne glass in foreground looking down past the rim」的精确指令

**证据：** 1.2.5 的 8-shot 提示词写了超过 2000 词的 Main Prompt，开头 2 句是身份锁定，后面 1998 句是场景/动作/构图/表情。模型接到的指令中，身份相关的权重不到 0.1%。结果必然不像。

**1.x 的修复方向也是错的：**

每个版本都在「加更多规则→写更多文字→生成更不像」的循环里。

| 版本 | 做了什么 | 实际效果 |
|---|---|---|
| 1.2.3 | 强调 identity consistency | 提示词变长 |
| 1.2.4 | 禁止文字定义外貌 | 提示词变长（换了一种写法） |
| 1.2.5 | 四级分类 + 诊断指南 | 提示词变得极其长 |

**每一个版本都在让提示词变得更长，而更长的提示词只会让脸更像文字描述的人物，而不是参考图的人物。**

---

## 2.0 的第一原则

> **参考图决定「是谁」。文本越少越好。**
> **每增加一行文字，身份丢失风险上升一级。**

### 三个核心否定

1. **否定「文本控制场景」的幻觉。** 场景不需要用文字精确描述。模型看到参考图 + 3 个关键词后，会自动补全场景细节。写越多，模型越跑偏。
2. **否定「身份锁定词」的效力。** 「do not redesign the face」这份指令在 2000 词的 prompt 中几乎为零。身份锁定靠的是**平台参数**（face weight, identity weight, --iw），不是靠文字承诺。
3. **否定「多 shot 一次生成」。** 一次只生成一张图。每张图独立写 prompt，其中 80% 的内容是相同的核心身份块。

---

## 生成流程

### Step 1：确定核心身份锚点

从参考图中提取 **不超过 3 个** 身份锚点词：

- 发型（例如：short pink bob）
- 气质基调（例如：cold dangerous）
- 标志性表情状（例如：lips slightly parted）

不提取五官描述、年龄描述、种族描述、脸型描述。这些由参考图负责。

### Step 2：确定固定视觉锚点

从目标场景中提取 **不超过 5 个** 视觉锚点词：

```
white satin dress, pearl crown, dark green wall, direct flash
```

这是场景的描述极限。每个词都是一个「视觉变量」——模型可以参考图人物穿上白色缎面、戴上皇冠、站在暗墙前、被闪光打亮。

不多于 5 个。多于 5 个意味着这个场景本身已经被文字定义得太具体了。

### Step 3：确定该张的变化词

每张图只加 **1 个** 构图变化和 **1 个** 动作/姿势变化：

```
low angle, champagne glass foreground
```

或：

```
high angle tabletop, cake in lower frame
```

或：

```
ultra close, gloved hand over mouth
```

**不加** 表情描述、不加肢体关系展开、不加镜头型号、不加光线解释、不加氛围渲染。

### Step 4：组合成最终 prompt

最终 Main Prompt 的结构：

```
--- 身份锁定（2 行）---
Use reference image. Same person. [2-3 identity anchors].

--- 视觉锚点（1 行）---
[5 个以内名词，逗号分隔]

--- 该张变化（1 行）---
[1 个构图词]，[1 个动作词]
```

**总行数：不超过 4 行。**

---

## 完整示例

### 不建议的写法（1.x 风格）

```
Use the provided reference image as the strict identity reference.
Generate the same adult person from the reference image.
Do not redesign the face, do not replace the person with a generic model.

Create a realistic summer city street portrait.
Bright urban street with green tree shade, zebra crossing,
softly blurred cars, sunlight filtering through leaves,
dappled light creating soft highlights and subtle lens flare,
breezy summer atmosphere.

Style the reference person with loose wavy hair, natural clean makeup,
a black summer dress, black shoulder bag.

The pose should feel like a candid photo taken by a friend:
natural smile, looking back at the camera, walking forward,
gently waving, dress moving in the wind.

High-end summer magazine cover, fresh, bright, soft-focus,
subtle film look, slight overexposure, shallow depth of field,
translucent natural skin texture.
```

**问题：** 这个 prompt 里有一幅完整的画面。模型不需要参考图就能画出「夏日街拍的年轻亚洲女性」。参考图被降级为色彩参考。

### 建议的写法（2.0 风格）

```
Use reference image. Same person. Short pink bob, cold aura.

White satin, pearl crown, dark wall, direct flash.

Low angle, champagne glass foreground.
```

**理由：** 模型读完后，面部信息只有参考图能提供。场景只有 4 个名词。模型必须从参考图里提取身份信息。文字不存在重建一个人脸的原料。

---

## Main Prompt 长度上限

| 场景类型 | Main Prompt 上限 | 说明 |
|---|---|---|
| 通用人物参考 | 4 行 / 40 词 | 最简单的场景 |
| 复杂场景 | 6 行 / 60 词 | 每增加一行，必须删除另一行 |
| 相似度优先 | 3 行 / 30 词 | 只保留身份锁定 + 最必要锚点 |
| 系列生成 | 3 行核心块 + 1 行变化 | 核心块不变，只换变化行 |

**超过这个上限，必须删减文字，不能直接追加。**

---

## 词汇选择规则

### 名词优先

- 正确：「champagne glass foreground」——名词，让模型理解「有什么」
- 错误：「a champagne glass fills the lower third of the frame as blurred foreground obstruction」——太多指令，告诉模型「怎么画」

### 不用动词

- 正确：「half-lidded eyes, slight smirk」——状态名词
- 错误：「she looks down at the camera with half-lidded eyes and a slight smirk」——完整的句子会激活模型的文本图像生成路径，让它更依赖文字而不是参考图

### 不用程度词

- 删除：slightly, subtly, gently, softly, a bit, kind of, very, extremely
- 原因：程度词需要模型去「理解程度」，这需要更多计算资源从文字侧而非参考图侧

### 不用解释性描述

- 删除：creates, making, creating, producing, causing, allowing
- 原因：解释光线效果或身体关系会让模型认为文字是精确指令，从而降低参考图的权重

### 不用心理动机

- 删除：like she's about to, as if she just, suggesting that, implying
- 原因：心理描写激活的是模型的面部表情生成路径，而不是参考图复制路径

---

## 平台参数优先级

2.0 的原则是：**身份一致性靠参数，不靠文字。**

文字是风险，参数才是控制。

### Midjourney

```
--iw 2          (最大身份权重)
--sw 0          (最小风格权重，甚至可以为负)
--s 0           (最小风格化)
--no face too small, blurry face, soft focus on face, different person
```

### SDXL / Flux (IP-Adapter)

```
IP-Adapter Face ID weight: 0.9-1.0
IP-Adapter Plus weight: 0.3-0.5 (仅用于场景参考)
ControlNet: Canny 或 Depth 仅控制姿势
Style weight: 0.1-0.2
```

### 通用原则

- 身份权重设到平台允许的最高值
- 风格权重设到平台允许的最低值
- 如果平台需要显式参数名称，优先使用 face / identity / character reference 模式
- 如果平台有 style reference 和 face reference，**只使用 face reference**

---

## 渐进式生成策略

不是一次性写出完美 prompt。而是从最简版本开始，确认身份后再扩展。

### 流程图

```
Run 1: 4 行 prompt
  ├─ 脸像了 → 进入 Run 2
  └─ 不像 → 停。检查参考图质量
                 ├─ 参考图模糊/太小/强美颜 → 换参考图
                 └─ 参考图 OK → 删减到 2 行再试

Run 2: 加 1 个变化词
  ├─ 脸像了 → 进入 Run 3
  └─ 脸跑了 → 退回 Run 1 的版本

Run 3: 加另 1 个变化词
  ├─ 脸像了 → 继续
  └─ 脸跑了 → 退回 Run 2 的版本
```

**核心规则：** 每一次改变只加一个词。每次生成后确认面容还在，再加下一个词。如果加了某个词后人跑了，这个词就是这个场景的敏感词。

---

## Main Prompt 模板

### 最小化模板

```markdown
# Complete Image Generation Prompt

## Main Prompt

Use reference image. Same person. [2-3 identity anchor nouns].

[3-5 visual anchor nouns, comma separated].

[1 composition noun], [1 body/action noun].

## Negative Prompt

different person, generic beauty face, plastic skin, blurry face, face too small, soft focus, watermark, text

## Reference Image Use

Reference image is the sole identity source. Set face weight to maximum.

## Recommended Settings

Identity weight: maximum
Style weight: minimum
```

### 系列生成模板（多张图共享核心块）

```markdown
## Core Block (shared across all shots)

Use reference image. Same person. [2-3 identity anchor nouns].
[3-5 fixed visual anchor nouns, comma separated].

---

## Shot-specific variations

Shot 1: [1 composition noun], [1 body/action noun]
Shot 2: [1 composition noun], [1 body/action noun]
Shot 3: [1 composition noun], [1 body/action noun]
```

**每张图单独运行一次。不要合并在同一个生成请求里。**

---

## 2.0 是否就是正确的

不一定。它只是一个基于「把文字降到最少，把参考图权重提到最高」这个假设的实验版本。

如果你在 Midjourney 上用 --iw 2 配合 3 行 prompt 仍然不像，那说明问题不在 prompt 写作上——

- 要么是参考图本身不适合做 face reference
- 要么是当前图像模型对参考图人物的身份保持能力有限
- 要么是需要换一种参考图输入方式（比如只裁剪脸部作为 reference）

2.0 是一种假设：**之前不像，是因为文字写太多。** 它是否正确，需要一个测试来验证。
