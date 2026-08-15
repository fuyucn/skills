---
name: character-reference-prompts
description: |
  参考图人物生图提示词生成器：单人或多人参考照片 × 场景/风格提示词 → 保持人物身份生成新图。
  当前规范为 ref_image_prompt_gen 2.0.6：身份锁定、开头结尾框架、场景光融合、hypn 签名注入、失败修复。
---

# 人物参考图模式提示词

本 Skill 是 `ref_image_prompt_gen` 的完整规范库。**当前唯一现行版本是 2.0.6**，生成提示词时直接读取：

→ [ref_image_prompt_gen_version2.0.6.md](./ref_image_prompt_gen_version2.0.6.md)

## 核心原则（摘要）

- 参考图决定“是谁”，文本提示词只控制“在哪里、穿什么、做什么、怎么拍”。
- 不允许用文字重新定义参考图人物的脸、五官、年龄、种族、脸型、身材或身份外貌。
- 多人场景：每张参考图独立锁定对应人物，禁止换脸、混脸、交换服装/位置。
- 输出代码块只包含 `Main Prompt` + `Avoid / Negative Instructions`，不输出模型不需要的元信息。
- 每次输出自动在右下角注入半透明艺术签名 `hypn`。

## 快速工作流

1. 判断是否使用参考图及人数（单人/多人/纯文本模式）。
2. 按上传顺序映射参考图 → 画面人物（ref 1 → P1，ref 2 → P2，依次类推）。
3. 重写主体：身份信息极简，场景、服装、姿态、光线写具体。
4. 使用开头声明 + 结尾排除框架（Option C），或按 2.0.6 的身份陈述选项。
5. 构建 `Avoid` 列表，并检查身份、风格、姿势、脸可见性、签名、复制块。
6. 输出一个可直接复制的完整提示词块。

## 历史版本

全部旧版本保留在 [history/](./history/)，仅供回溯，不再作为现行规范：

| 版本 | 文件 |
|---|---|
| v1.0 | [ref_image_prompt_gen_version1.md](./history/ref_image_prompt_gen_version1.md) |
| v1.1 | [ref_image_prompt_gen_version1.1.md](./history/ref_image_prompt_gen_version1.1.md) |
| v1.2 | [ref_image_prompt_gen_version1.2.md](./history/ref_image_prompt_gen_version1.2.md) |
| v1.2 safe+ | [ref_image_prompt_gen_version1.2_safe_plus.md](./history/ref_image_prompt_gen_version1.2_safe_plus.md) |
| v1.2.1 | [ref_image_prompt_gen_version1.2.1.md](./history/ref_image_prompt_gen_version1.2.1.md) |
| v1.2.1 Copy | [ref_image_prompt_gen_version1.2.1 - Copy.md](<./history/ref_image_prompt_gen_version1.2.1 - Copy.md>) |
| v1.2.2 | [ref_image_prompt_gen_version1.2.2.md](./history/ref_image_prompt_gen_version1.2.2.md) |
| v1.2.3 | [ref_image_prompt_gen_version1.2.3.md](./history/ref_image_prompt_gen_version1.2.3.md) |
| v1.2.4 | [ref_image_prompt_gen_version1.2.4.md](./history/ref_image_prompt_gen_version1.2.4.md) |
| v1.2.5 | [ref_image_prompt_gen_version1.2.5.md](./history/ref_image_prompt_gen_version1.2.5.md) |
| 2.0 preview | [ref_image_prompt_gen_version2.0-preview.md](./history/ref_image_prompt_gen_version2.0-preview.md) |
| 2.0.1 preview | [ref_image_prompt_gen_version2.0.1-preview.md](./history/ref_image_prompt_gen_version2.0.1-preview.md) |
| 2.0.2 | [ref_image_prompt_gen_version2.0.2.md](./history/ref_image_prompt_gen_version2.0.2.md) |
| 2.0.2 GPT/Grok/Doubao | [ref_image_prompt_gen_version2.0.2-gpt-grok-doubao.md](./history/ref_image_prompt_gen_version2.0.2-gpt-grok-doubao.md) |
| 2.0.3 | [ref_image_prompt_gen_version2.0.3.md](./history/ref_image_prompt_gen_version2.0.3.md) |
| 2.0.4 | [ref_image_prompt_gen_version2.0.4.md](./history/ref_image_prompt_gen_version2.0.4.md) |
| 2.0.5 | [ref_image_prompt_gen_version2.0.5.md](./history/ref_image_prompt_gen_version2.0.5.md) |
| 原始古风版 | [gufeng_ref_image_prompt_v1.2.md](./history/gufeng_ref_image_prompt_v1.2.md) |
| 变更记录 | [changelog.md](./history/changelog.md) |

## 相关模块

以下模块位于 [references/](./references/)，按需读取：

- [signature_mark.md](./references/signature_mark.md) — `hypn` 签名注入规范 v2
- [signature_mark_2.md](./references/signature_mark_2.md) — `hypn` 签名注入规范 v3（body embed）
- [image_reverse_ref_prompt_gen_version1.2.3.md](./references/image_reverse_ref_prompt_gen_version1.2.3.md) — 从成品图反推提示词
- [image_reverse_ref_prompt_gen_version1.2.3-1.md](./references/image_reverse_ref_prompt_gen_version1.2.3-1.md) — 反推提示词变体
- [random_prompt.md](./references/random_prompt.md) — 超强随机性分行法生图
- [output.txt](./references/output.txt) — 输出示例

> 精简可执行版见 `../ref-to-image/`；本目录保留完整规范与全部历史版本。
