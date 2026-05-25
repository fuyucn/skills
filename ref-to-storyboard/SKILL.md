---
name: ref-to-storyboard
description: |
  参考图+梗概描述 → 文字分镜脚本 → Grok视频全流程。
  核心能力：将P1/P2参考图和故事梗概自动拆解为结构化文字分镜，
  直接将P1/P2原图+文字时间线送入grok-video，避免分镜图二次漂移。
  触发词：「生成分镜」「分镜图」「参考图分镜」「生成分镜图」「storyboard」
  「P1 P2分镜」「分镜转视频」「梗概生分镜」「故事分镜」「生成连续视频」
  「3x3分镜」「分镜图生视频」「参考图故事视频」。
---

# 参考图分镜生成器

> 分镜图只用于预览，不作为 Grok 参考输入——原图直接喂给 Grok，才能保留容貌。

---

## 核心原则

```
❌ 旧流程（容貌漂移两次）：
P1/P2原图 → GPT Image 2生分镜图（第一次漂移）→ 分镜图喂Grok（第二次漂移）→ 视频

✅ 新流程（容貌漂移一次）：
P1/P2原图 → 文字分镜脚本 → P1原图 + P2原图 + 文字时间线 → Grok → 视频
分镜图（可选）→ 仅用于用户预览和确认场景，不作为Grok参考图输入
```

**分镜图的正确定位**：预览场景布局 / 给用户确认动作是否符合预期，不是 Grok 的容貌参考。

---

## 完整工作流

```
Step 1：收集输入（参考图 + 梗概 + 参数）
    ↓
Step 2：拆解故事为文字分镜脚本（时间码格式）
    ↓
Step 3A（可选）：生成 GPT Image 2 分镜图用于预览
    ↓
Step 3B：生成 Grok 视频提示词（文字时间线，不依赖分镜图）
    ↓
Step 4：P1原图 + P2原图 + 文字提示词 → grok-video CLI
    ↓
Step 5：抽帧审查 → 决定是否重跑
```

---

## Step 1：收集输入

| 参数 | 说明 | 示例 |
|------|------|------|
| P1 参考图路径 | 第一个人物的清晰正脸照 | C:/Users/.../p1.jpg |
| P2 参考图路径 | 第二个人物（如有） | C:/Users/.../p2.jpg |
| 故事梗概 | 描述场景、动作、情绪 | P1把P2推到床上，压住双手，缓缓亲吻 |
| 视频时长 | 秒数 | 10s |
| 画面比例 | 16:9 / 9:16 / 1:1 | 16:9 |
| 分辨率 | 480p / 720p | 480p |
| 场景风格 | 画面质感 | 真实居家写实 / 电影感 / 户外 |

---

## Step 2：文字分镜脚本（时间码格式）

根据梗概和时长，拆解为带时间码的动作序列：

### 10秒 分镜模板

```
0-2s：[建立场景 + 人物出现 + 初始状态]
2-4s：[动作起点 + 两人接触/互动开始]
4-7s：[动作高峰 + 情绪核心，最重要的段落]
7-9s：[动作延续 + 情绪加深]
9-10s：[收束 + 余韵定格]
```

### 5秒 分镜模板

```
0-1s：[场景建立]
1-2s：[动作起点]
2-4s：[动作高峰]
4-5s：[收束定格]
```

### 安全写法参考表

| 动作描述 | Grok提示词安全写法 |
|---------|-----------------|
| 推到床上 | gently guides [P2] onto soft bedding, [P2] naturally reclines |
| 压住双手 | tenderly holds [P2]'s hands, [P2] relaxed and willing |
| 慢慢亲吻 | slowly leans closer, eyes softly closing, lips meeting in a tender kiss |
| 深吻 | a deep tender kiss, both fully immersed, emotionally expressive |
| 依偎在一起 | foreheads touching, eyes closed, warm golden light wrapping around them |
| 拥抱 | natural close embrace, arms around each other, relaxed and warm |

---

## Step 3A（可选）：GPT Image 2 分镜图预览

**用途**：让用户确认场景布局、动作序列是否符合预期。
**注意**：此分镜图不作为 Grok 参考图使用。

```
请根据参考图生成一张[N×M]分镜网格图，仅用于场景预览，风格为[画面风格]。
图片尺寸：[比例]，包含[N×M]个等分格，格子之间有细边框，每格左上角标注格号。

[P1] 身份锚点（第1张参考图）：
保持脸型轮廓、五官比例、眉眼关系、眼睛形状、鼻梁与鼻头、
唇形、下颌线、肤色类型、年龄感和整体气质。

[P2] 身份锚点（第2张参考图）：
保持脸型轮廓、五官比例、眉眼关系、眼睛形状、鼻梁与鼻头、
唇形、下颌线、肤色类型、年龄感和整体气质。

分镜序列：
格1：[格1描述]
格2：[格2描述]
...

画面要求：每格独立构图，光线统一，不要文字说明，不要对话框。
所有人物均为成年人，画面自然优雅，非挑逗，不要裸露，不要性暗示。
```

---

## Step 3B：Grok 视频提示词

**核心结构**：身份锚定 + 时间线动作 + 镜头运动 + 风格 + 负向约束

```
Generate one continuous natural [时长]-second cinematic video.
Do NOT create a slideshow. This must be a single flowing cinematic video.

Reference images provided:
- Image 1 = [P1]: [P1简短外貌描述，如 adult female, black hair, natural makeup]
- Image 2 = [P2]: [P2简短外貌描述，如 adult male, short brown hair]
Preserve each person's facial identity, hairstyle, skin tone, and overall appearance
throughout the entire video. Do not swap or replace either person's face.

Story arc:
[0-Xs]: [阶段1]
[X-Xs]: [阶段2]
[X-Xs]: [阶段3，高峰]
[X-Xs]: [收束]

Camera: [镜头运动]
Lighting: [光线]
Style: [风格词]
Scene: [场景描述]

Negative: No slideshow, no scene jumps, no AI plastic look, no deformed hands,
no extra fingers, no text overlays, no underage look, no explicit content.
Both subjects are clearly adults.
```

---

## Step 4：grok-video CLI 命令

**关键：P1原图 + P2原图 直接作为参考图，不用分镜图**

```bash
cd D:/animiated-png/skills/.agents/skills/grok-video

npm run video -- \
  --prompt-file prompts/[提示词文件].txt \
  --reference-image "[P1原图路径]" \
  --reference-image "[P2原图路径]" \
  --duration [时长] \
  --aspect-ratio [比例] \
  --resolution [分辨率] \
  --prefix [前缀]
```

**若需要分镜图辅助场景布局**（分镜图排在最后，权重最低）：

```bash
npm run video -- \
  --prompt-file prompts/[提示词文件].txt \
  --reference-image "[P1原图路径]" \
  --reference-image "[P2原图路径]" \
  --reference-image "[分镜图路径]" \
  --duration [时长] \
  --aspect-ratio [比例] \
  --resolution [分辨率] \
  --prefix [前缀]
```

---

## 完整示例

**用户输入**：
```
P1: C:/Users/ryanf/iCloudDrive/su/IMG_1275.PNG
P2: C:/Users/ryanf/iCloudDrive/su/IMG_1276.PNG
梗概：真实居家风格，P1把P2引导躺在床上，温柔压住双手，缓缓亲吻
时长：10s，16:9，480p
```

---

### Step 2 文字分镜脚本

```
0-2s: Warm bedroom. [P1] gently guides [P2] onto soft white bedding.
      [P2] naturally reclines. Both exchange a warm, intimate glance.
2-4s: [P1] tenderly holds [P2]'s hands against the pillow.
      Slow push-in. Deep eye contact, faces drawing closer.
4-7s: [P1] slowly leans down. Eyes softly closing.
      Lips meeting in a gentle, deeply tender kiss.
      [P1]'s hand softly cupping [P2]'s face.
7-9s: The kiss deepens. Both fully immersed.
      Warm bokeh glow, emotionally expressive, cinematic.
9-10s: Slow pull-back. Foreheads touching, eyes closed.
       Warm golden light. Romantic closing frame.
```

### Step 3B Grok 提示词（保存为 prompts/home-romance-v3.txt）

```
Generate one continuous natural 10-second cinematic video.
Do NOT create a slideshow. This must be a single flowing cinematic video
with natural camera movement and continuous action.

Reference images provided:
- Image 1 = [P1]: the first person, preserve their exact facial features,
  hairstyle, skin tone, and appearance throughout the entire video.
- Image 2 = [P2]: the second person, preserve their exact facial features,
  hairstyle, skin tone, and appearance throughout the entire video.
Do not swap faces. Do not replace either person with a different face.

Story arc:
0-2s: Warm bedroom establishing shot. [P1] gently guides [P2] onto soft
      white bedding. [P2] naturally reclines. Warm golden light fills the room.
2-4s: Slow push-in. [P1] tenderly holds [P2]'s hands. Deep eye contact,
      faces drawing closer, emotional warmth building.
4-7s: Close-up. [P1] slowly leans down toward [P2]. Eyes softly closing.
      Lips meeting in a gentle, tender kiss. [P1]'s hand softly cupping [P2]'s face.
7-9s: The kiss deepens. Both fully immersed. Warm bokeh glow around them.
      Emotionally expressive and cinematic.
9-10s: Slow pull-back. Foreheads touching, eyes closed, catching breath.
       Warm golden light. Romantic cinematic closing frame.

Camera: Slow push-in from medium shot to close-up. Hold at emotional peak.
        Gentle pull-back at resolution. Subtle handheld warmth. Shallow depth of field.
Lighting: Warm golden indoor ambient light. Soft natural window light. No harsh shadows.
Scene: Cozy bedroom, soft white bedding, warm intimate atmosphere.
Style: High-end romantic cinema. Real photography feel. Film grain. Warm golden tones.

Negative: No slideshow, no static frames, no scene jumps, no AI plastic look,
no deformed hands, no extra fingers, no text overlays, no underage look, no explicit content.
Both subjects are clearly adults. The interaction is tender, natural, and consensual.
```

### Step 4 CLI 命令

```bash
cd D:/animiated-png/skills/.agents/skills/grok-video

npm run video -- \
  --prompt-file prompts/home-romance-v3.txt \
  --reference-image "C:/Users/ryanf/iCloudDrive/su/IMG_1275.PNG" \
  --reference-image "C:/Users/ryanf/iCloudDrive/su/IMG_1276.PNG" \
  --duration 10 \
  --aspect-ratio 16:9 \
  --resolution 480p \
  --prefix home-romance-v3
```

---

## 容貌保留效果优先级

| 方案 | 容貌还原 | 场景控制 | 推荐场景 |
|------|---------|---------|---------|
| P1+P2原图 + 文字时间线 | ⭐⭐⭐⭐ | ⭐⭐⭐ | **默认推荐** |
| P1+P2原图 + 分镜图 + 文字 | ⭐⭐⭐ | ⭐⭐⭐⭐ | 场景布局复杂时 |
| 分镜图单独 + 文字 | ⭐⭐ | ⭐⭐⭐⭐⭐ | 不推荐（漂移严重） |
| 角色卡 + 文字时间线 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | 真人照片审查严格时 |

---

## 诚实边界

- Grok 对真实人物容貌的还原受限于平台技术，多次迭代可改善但无法完美
- 参考图越清晰、越接近正脸，容貌保留效果越好
- 复杂动作（多人肢体接触）中手部变形概率较高，需多次重跑
- 参考图顺序影响权重：先传的图权重更高，P1/P2 应在分镜图之前传入

---

> 配合使用：`ref-to-image` → `ref-to-storyboard` → `grok-video`
> 创建时间：2026-05-24 | 优化：2026-05-25（移除分镜图作为Grok参考的错误流程）
