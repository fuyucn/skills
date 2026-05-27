---
name: gpt-image-2
description: |
  GPT Image 2 图片生成器：通过第三方 Token Hub 代理调用 GPT Image 2 API。
  输入提示词 → 直接同步调用 → 返回图片 URL / 自动下载。
  触发词：「生成图片」「GPT生图」「gpt-image」「画一张」「AI绘画」
  「生成一张」「帮我画」「用GPT画图」「生成插图」「AI画图」「画图」。
---

# GPT Image 2 图片生成器

> 通过第三方 Token Hub 代理，一句话生成一张图片。

---

## 环境准备（首次使用）

在 skill 目录下创建 `.env` 文件：

```bash
GPT_IMAGE_BASE_URL=https://your-token-hub.example.com   # 第三方 Token Hub 地址
GPT_IMAGE_TOKEN=sk-your-token-here                       # Hub 提供的 Token
```

默认模型 `gpt-image-2`，无需额外配置。

---

## 完整工作流

```
Step 1：确认需求 → Step 2：运行生成脚本 → Step 3：拿到图片
```

---

## Step 1：需求确认

| 参数 | 默认值 | 说明 |
|------|--------|------|
| 提示词 | 必填 | 图片描述，英文效果更好，上限 4000 字符 |
| 图片尺寸 | 1024x1024 | 1024x1024 / 1792x1024 / 1024x1792 |
| 生成数量 | 1 | 1-10 张 |
| 输出目录 | outputs | 图片保存位置 |
| 输出前缀 | gpt-image | 文件名前缀 |
| 图片格式 | url | url（返回链接，30天有效）/ b64_json（base64，立即保存） |

**快速确认模板**：

```
我来确认参数：
1. 提示词是什么？
2. 尺寸：1024x1024 方形 / 1792x1024 横版 / 1024x1792 竖版？
3. 生成几张？（1-10）
```

---

## Step 2：运行生成脚本

```bash
cd C:\Users\ryanf\AppData\Roaming\CherryStudio\Data\Skills\gpt-image-2
```

### 基础用法

```bash
node src/generate.mjs --prompt "A serene mountain lake at sunset, photorealistic"
```

### 完整参数

```bash
node src/generate.mjs \
  --prompt "你的提示词" \
  --size 1024x1024 \
  --n 1 \
  --format b64_json \
  --prefix my-image \
  --output-dir ./outputs
```

| 参数 | 说明 |
|------|------|
| `--prompt` | 图片描述（必填） |
| `--size` | 1024x1024 / 1792x1024 / 1024x1792 |
| `--n` | 生成数量 1-10 |
| `--format` | url（返回链接）/ b64_json（保存本地） |
| `--prefix` | 输出文件名前缀 |
| `--output-dir` | 输出目录 |

---

## Step 3：输出

```bash
# 直接输出：
# 图片 URL（format=url） 或 本地文件路径（format=b64_json）
# 同时保存 metadata.json 记录完整请求/响应
```

---

## Gotchas

- **Token Hub 的 base URL 需要完整地址**，如 `https://hub.example.com`（不带 `/v1` 后缀）
- **提示词用英文效果更好**，GPT Image 2 对英文理解更精准
- **url 格式的图片链接 30 天有效**，需要长期保存请用 `b64_json`
- **尺寸只在 1024x1024 时支持 n > 1**，其他尺寸只能 n=1
- **Token Hub 可能有速率限制**，批量生成建议间隔 2 秒

---

## 诚实边界

- 需要第三方 Token Hub 的 base URL 和有效 token
- GPT Image 2 有内容安全过滤，某些提示词可能被拒绝
- 生成质量取决于提示词质量，建议搭配 image-prompt-master skill 优化提示词
- Token Hub 是第三方服务，稳定性和延迟不在控制范围内
- 单次生成通常 5-15 秒，取决于 Hub 和 API 负载

---

> 创建时间：2026-05-27
