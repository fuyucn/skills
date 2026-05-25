# Prompt Examples

> 读取条件：需要查看完整示例提示词时。

## 示例1：参考图浪漫场景（5秒，9:16）

**用户输入**：参考图是情侣合照，生成两人接吻的5秒视频，9:16

**增强后提示词**（保存为 `prompts/romance.txt`）：

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

**CLI 命令**：

```bash
cd D:/animiated-png/skills/.agents/skills/grok-video
npm run video -- \
  --prompt-file prompts/romance.txt \
  --reference-image "path/to/couple.png" \
  --duration 5 --aspect-ratio 9:16 --resolution 480p --prefix romance
```

---

## 示例2：纯文生视频（5秒，9:16）

```bash
npm run video -- \
  --prompt "A cinematic vertical social media clip. A young woman walks through a neon-lit Tokyo street at night, slow motion, shallow depth of field, warm street lights reflecting on wet pavement, cinematic film grain, 9:16 vertical format." \
  --duration 5 --aspect-ratio 9:16 --resolution 480p --prefix tokyo-night
```
