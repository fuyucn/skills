# CLI 完整参数表

> 读取条件：需要查阅不常用参数时。

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

## CLI 输出说明

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
