---
name: grok-video
description: |
  Grok Imagine Video 全流程生成器：文生视频 + 参考图生成视频。
  完整工作流：提示词增强 → 参数确认 → 调用 xAI API → 自动下载 → 抽帧审查 → 决定是否重跑。
  触发词：「生成视频」「Grok视频」「文生视频」「参考图生视频」「reference to video」
  「grok video」「生成短视频」「AI视频」「xAI生视频」「生成一段视频」。
---

# Grok Video 全流程生成器

> 从一句话到一段视频，5步完成。

---

## 环境准备（首次使用）

```bash
# 1. 进入 skill 目录
cd D:/animiated-png/skills/.agents/skills/grok-video

# 2. 复制 .env 并填入 API Key
cp .env.example .env
# 编辑 .env，填入：XAI_API_KEY=your-xai-api-key

# 3. 安装依赖（已安装可跳过）
npm install
```

**获取 xAI API Key**：https://console.x.ai → API Keys

---

## 完整工作流

```
Step 1：确认需求
    ↓
Step 2：增强提示词
    ↓
Step 3：确认参数
    ↓
Step 4：运行 CLI 生成视频
    ↓
Step 5：抽帧审查 → 判断是否重跑
```

---

## Step 1：需求确认

收到用户请求后，依次确认以下信息：

| 问题 | 默认值 | 说明 |
|------|--------|------|
| 有参考图吗？ | 无（文生视频） | 有图=参考图生视频，最多7张，最长10秒 |
| 视频描述/剧本 | 必填 | 场景、人物、动作、氛围 |
| 视频时长 | 5秒 | 文生视频1-15秒；参考图生视频1-10秒 |
| 画面比例 | 16:9 | 16:9 / 9:16 / 1:1 / 4:3 / 3:4 / 3:2 / 2:3 |
| 分辨率 | 480p | 480p（$0.05/秒）或 720p（$0.07/秒） |
| 输出文件前缀 | grok-video | 方便识别的文件名前缀 |

**快速确认模板**（如用户信息不完整时使用）：

```
我来确认几个参数：
1. 有参考图吗？（有的话请提供路径）
2. 想生成多少秒？（参考图最长10秒，文生视频最长15秒）
3. 画面比例：9:16竖版 / 16:9横版 / 1:1方形？
4. 分辨率：480p（省钱）还是720p（更清晰）？
```

---

## Step 2：提示词增强

### 判断是否需要增强

| 用户输入 | 处理 |
|---------|------|
| 一句话描述（如"两人接吻"） | 需要完整增强 |
| 已有详细提示词 | 检查结构，补充缺失部分 |
| 英文提示词 | 检查是否在4096字符内 |

### 提示词结构模板

```
[场景设定]
[人物/主体描述] - 结合参考图特征（如有）
[动作时间线] - 0-1s / 1-3s / 3-5s 分段描述
[镜头运动] - 推进 / 拉远 / 环绕 / 静止
[光线与氛围]
[画面风格]
[负向约束]
```

### 动作时间线写法

```
0-1s: [起始画面，建立场景]
1-3s: [主要动作展开]
3-4s: [情绪/动作高峰]
4-5s: [结尾画面，情绪收束]
```

### 参考图生视频：身份保留写法

```
Preserve the reference image subject's facial identity, hairstyle,
skin tone, outfit colors, and overall appearance throughout the video.
Do not change the subject's face or replace them with a different person.
```

### 安全审查友好写法

| 高风险描述 | 推荐替代 |
|-----------|---------|
| 接吻、亲吻 | share a tender kiss / lips meeting softly |
| 性感、诱惑 | elegant, cinematic, emotionally expressive |
| 暴露、裸露 | tasteful styling, natural and dignified |
| 床上亲密 | cozy indoor setting, warm ambient light |

### 4096字符检查

提示词完成后，告知字符数：
```
当前提示词：XXX 字符 / 4096 上限
```

若超出，压缩策略：
1. 合并相邻时间段的描述
2. 删除重复的风格词
3. 负向约束合并为一行

---

## Step 3：参数确认与成本预估

生成命令前，输出确认单：

```
生成参数确认：
─────────────────────────────
模式：参考图生视频 / 文生视频
参考图：[路径] × N张
时长：Xs
比例：X:X
分辨率：Xp
预估费用：$X.XX
输出前缀：xxx
─────────────────────────────
确认运行？
```

**成本参考**：

| 时长 | 480p | 720p |
|------|------|------|
| 5秒 | $0.25 | $0.35 |
| 10秒 | $0.50 | $0.70 |

---

## Step 4：运行 CLI

**工作目录必须在 skill 目录下**：

```bash
cd D:/animiated-png/skills/.agents/skills/grok-video
```

### 文生视频

```bash
npm run video -- \
  --prompt "your enhanced prompt" \
  --duration 5 \
  --aspect-ratio 9:16 \
  --resolution 480p \
  --prefix my-video
```

### 参考图生视频（单图）

```bash
npm run video -- \
  --prompt-file prompts/my-prompt.txt \
  --reference-image "path/to/reference.png" \
  --duration 5 \
  --aspect-ratio 9:16 \
  --resolution 480p \
  --prefix my-video
```

### 参考图生视频（多图，最多7张）

```bash
npm run video -- \
  --prompt-file prompts/my-prompt.txt \
  --reference-image "path/to/ref1.png" \
  --reference-image "path/to/ref2.png" \
  --duration 10 \
  --aspect-ratio 9:16 \
  --resolution 720p \
  --prefix my-video
```

### 续传已有 request（网络中断恢复）

```bash
npm run video -- \
  --request-id <request_id> \
  --prefix my-video
```

**CLI 输出说明**：

```
model: grok-imagine-video
estimated_cost_usd: 0.25 (5s 480p)
reference_images: 1
request_id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   ← 保存此ID，网络中断可续传
status: pending
status: pending
status: done
video_url: https://vidgen.x.ai/...
saved_video: outputs/my-video-xxx.mp4
metadata: outputs/my-video-xxx.json
```

---

## Step 5：抽帧审查

```bash
npm run review -- --video outputs/my-video-xxx.mp4
```

生成抽帧图后，逐项检查：

| 检查项 | 通过标准 |
|--------|---------|
| 动作连贯性 | 无跳帧，动作自然过渡 |
| 人物身份一致 | 参考图人物全程未换脸 |
| 手指/手势 | 无多余手指，无变形 |
| 文字/字幕 | 无乱码，无意外文字 |
| 场景跳变 | 无突然场景切换 |

### 判断结果

**通过** → 直接给用户视频路径

**部分问题** → 调整提示词后重跑：
- 动作不连贯 → 细化时间线，每1-2秒一个动作节点
- 换脸/脸漂移 → 加强身份保留描述，补充参考图
- 镜头静止 → 加入镜头运动指令（slow push-in / gentle pan）
- 黑边 → 检查参考图比例是否匹配目标比例

**失败** → 完整重写提示词

---

## 完整示例

### 示例1：参考图浪漫场景

**用户输入**：参考图是情侣合照，生成两人接吻的5秒视频，9:16

**Step 2 增强后提示词**（保存为 prompts/romance.txt）：

```
A cinematic 5-second vertical romantic scene. Two adults from the reference image share a tender, intimate kiss.

Opening (0-1s): The couple stands close together in warm golden light, cozy indoor setting, blurred background. Faces close, eyes softly closing, a moment of quiet anticipation.

Action (1-3s): Slow, gentle movement as they naturally lean toward each other. Lips meeting softly, eyes closed, emotionally resonant.

Close (3-5s): Slow pull-back to medium shot, warm bokeh background, emotional and cinematic ending frame.

Camera: Slow push-in from medium to close-up. Shallow depth of field, gentle handheld warmth.

Lighting: Warm golden hour or soft indoor ambient light. Gentle rim light on hair and shoulders.

Style: Cinematic portrait, real photography feel, shallow depth of field, film grain, warm golden tones.

Negative: No AI plastic feel, no text overlays, no underage look, no explicit content, no deformed hands.

Both subjects are clearly adults. The interaction is natural, consensual, and emotionally expressive.
```

**Step 3 运行命令**：

```bash
cd D:/animiated-png/skills/.agents/skills/grok-video
npm run video -- \
  --prompt-file prompts/romance.txt \
  --reference-image "path/to/couple.png" \
  --duration 5 \
  --aspect-ratio 9:16 \
  --resolution 480p \
  --prefix romance
```

---

### 示例2：纯文生视频

```bash
npm run video -- \
  --prompt "A cinematic vertical social media clip. A young woman walks through a neon-lit Tokyo street at night, slow motion, shallow depth of field, warm street lights reflecting on wet pavement, cinematic film grain, 9:16 vertical format." \
  --duration 5 \
  --aspect-ratio 9:16 \
  --resolution 480p \
  --prefix tokyo-night
```

---

## CLI 完整参数表

| 参数 | 说明 | 默认值 |
|------|------|--------|
| `--prompt` | 直接输入提示词文本 | — |
| `--prompt-file` | 从文件读取提示词 | — |
| `--reference-image` | 参考图路径或HTTPS URL，可重复最多7次 | — |
| `--duration` | 时长秒数（参考图最长10秒） | 5 |
| `--aspect-ratio` | 16:9 / 9:16 / 1:1 / 4:3 / 3:4 / 3:2 / 2:3 | 16:9 |
| `--resolution` | 480p 或 720p | 480p |
| `--prefix` | 输出文件名前缀 | grok-video |
| `--output-dir` | 输出目录 | outputs |
| `--request-id` | 续传已有请求 | — |
| `--no-download` | 只输出URL不下载 | — |
| `--poll-interval` | 轮询间隔秒数 | 5 |
| `--timeout-minutes` | 超时分钟数 | 20 |

---

## 诚实边界

- 需要 xAI API credits，不是免费额度
- 参考图生视频：人物身份可能在长视频中漂移，建议5秒以内
- 手部/手指在复杂动作中仍可能出错，审查后决定是否重跑
- Grok 视频有自己的内容政策，部分内容可能被拒绝
- 提示词上限4096字符，超出会报错

---

> 项目来源：https://github.com/Rion-Wu-tech/grok-video-workflow
> 集成时间：2026-05-24
