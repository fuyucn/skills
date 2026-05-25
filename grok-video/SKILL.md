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
cd D:/animiated-png/skills/.agents/skills/grok-video
cp .env.example .env   # 填入 XAI_API_KEY
npm install
```

**获取 xAI API Key**：https://console.x.ai → API Keys

---

## 完整工作流

```
Step 1：确认需求 → Step 2：增强提示词 → Step 3：确认参数 → Step 4：运行 CLI → Step 5：抽帧审查
```

---

## Step 1：需求确认

| 问题 | 默认值 | 说明 |
|------|--------|------|
| 有参考图吗？ | 无（文生视频） | 有图=参考图生视频，最多7张，最长10秒 |
| 视频描述/剧本 | 必填 | 场景、人物、动作、氛围 |
| 视频时长 | 5秒 | 文生视频1-15秒；参考图生视频1-10秒 |
| 画面比例 | 16:9 | 16:9 / 9:16 / 1:1 / 4:3 / 3:4 / 3:2 / 2:3 |
| 分辨率 | 480p | 480p（$0.05/秒）或 720p（$0.07/秒） |
| 输出文件前缀 | grok-video | 方便识别的文件名前缀 |

**快速确认模板**：

```
我来确认几个参数：
1. 有参考图吗？（有的话请提供路径）
2. 想生成多少秒？（参考图最长10秒，文生视频最长15秒）
3. 画面比例：9:16竖版 / 16:9横版 / 1:1方形？
4. 分辨率：480p（省钱）还是720p（更清晰）？
```

---

## Step 2：提示词增强

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

提示词完成后确认字符数（上限4096）。若超出，合并相邻时间段 / 删除重复风格词 / 负向约束合并为一行。

---

## Step 3：参数确认与成本预估

```
生成参数确认：
─────────────────────────────
模式：参考图生视频 / 文生视频
参考图：[路径] × N张
时长：Xs | 比例：X:X | 分辨率：Xp
预估费用：$X.XX | 输出前缀：xxx
─────────────────────────────
确认运行？
```

| 时长 | 480p | 720p |
|------|------|------|
| 5秒 | $0.25 | $0.35 |
| 10秒 | $0.50 | $0.70 |

---

## Step 4：运行 CLI

```bash
cd D:/animiated-png/skills/.agents/skills/grok-video
```

### 文生视频

```bash
npm run video -- \
  --prompt "your enhanced prompt" \
  --duration 5 --aspect-ratio 9:16 --resolution 480p --prefix my-video
```

### 参考图生视频（单图）

```bash
npm run video -- \
  --prompt-file prompts/my-prompt.txt \
  --reference-image "path/to/reference.png" \
  --duration 5 --aspect-ratio 9:16 --resolution 480p --prefix my-video
```

### 参考图生视频（多图，最多7张）

```bash
npm run video -- \
  --prompt-file prompts/my-prompt.txt \
  --reference-image "path/to/ref1.png" \
  --reference-image "path/to/ref2.png" \
  --duration 10 --aspect-ratio 9:16 --resolution 720p --prefix my-video
```

### 续传已有 request（网络中断恢复）

```bash
npm run video -- --request-id <request_id> --prefix my-video
```

> 保存 CLI 输出的 `request_id`，网络中断时可用 `--request-id` 续传，否则需重新付费。

---

## Step 5：抽帧审查

```bash
npm run review -- --video outputs/my-video-xxx.mp4
```

| 检查项 | 通过标准 |
|--------|---------|
| 动作连贯性 | 无跳帧，动作自然过渡 |
| 人物身份一致 | 参考图人物全程未换脸 |
| 手指/手势 | 无多余手指，无变形 |
| 文字/字幕 | 无乱码，无意外文字 |
| 场景跳变 | 无突然场景切换 |

**部分问题修复方向**：
- 动作不连贯 → 细化时间线，每1-2秒一个动作节点
- 换脸/脸漂移 → 加强身份保留描述，补充参考图
- 镜头静止 → 加入镜头运动指令（slow push-in / gentle pan）
- 黑边 → 参考图比例与目标比例不一致，使用前先裁剪

---

## Gotchas

- **加外貌文字描述反而更不像**：提示词中写 P1/P2 具体外貌（发型、眼形等）会和参考图竞争，脸漂移更严重。直接用「Preserve each person's facial identity」，不要描述具体五官。
- **分镜图作为参考图 → 二次漂移**：GPT Image 2 生成分镜图时人脸已漂移一次，再喂给 Grok 产生双重漂移。分镜图只用于预览，不传入 Grok。
- **竖版参考图 + 横版视频 → 黑边**：参考图比例和目标视频比例不一致时出现黑边。使用前先裁剪到目标比例（16:9 横版）。
- **提示词超4096字符报错**：使用 `--prompt-file` 时必须检查字符数，超限直接报错。
- **中断后丢失 request_id**：CLI 输出的 `request_id` 须立即保存，否则网络中断后需重新付费生成。

> 完整 CLI 参数表 → 读取 `references/cli-params.md`
> 完整示例提示词 → 读取 `references/prompt-examples.md`

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
