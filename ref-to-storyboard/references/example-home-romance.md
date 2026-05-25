# 完整示例：家居浪漫场景（10秒，16:9）

> 读取条件：需要查看完整示例提示词时。

## 用户输入

```
P1: C:/Users/ryanf/iCloudDrive/su/IMG_1275.PNG
P2: C:/Users/ryanf/iCloudDrive/su/IMG_1276.PNG
梗概：真实居家风格，P1把P2引导躺在床上，温柔压住双手，缓缓亲吻
时长：10s，16:9，480p
```

---

## Step 2 文字分镜脚本

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

---

## Step 3B Grok 提示词（保存为 `prompts/home-romance-v3.txt`）

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

---

## Step 4 CLI 命令

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
