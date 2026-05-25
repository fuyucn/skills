# AI Image & Video Skills

Personal skill collection for AI image and video generation workflows.

## Install All Skills

```bash
npx skills add https://github.com/fuyucn/skills.git -y -g
```

## Install a Single Skill

```bash
npx skills add https://github.com/fuyucn/skills.git@image-prompt-master -y -g
```

## Skills

| Skill | Description |
|-------|-------------|
| [image-prompt-master](./image-prompt-master/) | GPT Image 2 prompt optimization — aesthetic words replace desire words |
| [ref-to-image](./ref-to-image/) | Generate new images from P1/P2 reference photos with identity anchors |
| [ref-image-compliance-prompt-master](./ref-image-compliance-prompt-master/) | Rewrite rejected prompts into platform-safe versions |
| [ref-to-storyboard](./ref-to-storyboard/) | Reference photos + story outline → storyboard → Grok video |
| [storyboard-to-video](./storyboard-to-video/) | Full AI video production pipeline: script → storyboard → video |
| [grok-video](./grok-video/) | Grok xAI video generation CLI with contact sheet review |
| [seedance2](./seedance2/) | 即梦 Seedance 2.0 多模态视频提示词专家，含@引用语法、首尾帧、运镜复刻 |

## grok-video Setup

```bash
cd grok-video
npm install
cp .env.example .env
# Edit .env and add your XAI_API_KEY
```
