---
layout: slide
title: "Work token-aware"
accent: neutral
section: "The talk · getting more from every token"
nav_order: 12
prev: "12-prompting-well"
next: "14-close"
---

# Work token-aware

Every turn, the agent re-sends the whole conversation to the model — system rules, tool definitions, history, file reads, *and* your prompt. Under usage-based billing, all of it counts. Context bloat is the single biggest source of waste.

![A horizontal stacked bar showing what fills the context window each turn: system instructions, tool definitions, conversation history (the largest slice), file reads, your prompt (the smallest), and the model's response.]({{ '/assets/img/token-bar.png' | relative_url }})

## Cheap wins you can use today

- **Keep context clean** — start a fresh session between unrelated tasks.
- **Keep `copilot-instructions.md` lean** — it's re-sent every turn.
- **Reference files, not directories** — read one function, not `src/`.
- **Right-size the model** — don't run routine edits on the heavy model.

<div class="callout tinted">
Three-command starter kit: <code>/clear</code> (reset context) · <code>/model</code> (match model to task) · <code>/usage</code> (see what a session cost).
</div>
