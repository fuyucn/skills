# grok-video

Grok xAI video generation skill — text-to-video and reference-image-to-video, with contact sheet review.

## Setup

```bash
cd grok-video
npm install
cp .env.example .env
```

Edit `.env` and add your API key:

```
XAI_API_KEY=your-xai-api-key
```

Get your key at: https://console.x.ai → API Keys

## Usage

```bash
# Text-to-video
npm run video -- --prompt "your prompt" --duration 5 --aspect-ratio 9:16

# Reference image to video
npm run video -- \
  --prompt-file prompts/my-prompt.txt \
  --reference-image "path/to/ref.png" \
  --duration 5

# Review output (generates contact sheet)
npm run review -- --video outputs/my-video.mp4
```

## Cost

| Duration | 480p | 720p |
|----------|------|------|
| 5s | $0.25 | $0.35 |
| 10s | $0.50 | $0.70 |

## Based on

[grok-video-workflow](https://github.com/Rion-Wu-tech/grok-video-workflow)
