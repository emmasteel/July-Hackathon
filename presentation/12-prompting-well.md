---
layout: slide
title: "Prompting well"
accent: neutral
section: "The talk · prompt, review, refine"
nav_order: 11
prev: "11-review"
next: "13-token-aware"
---

# Prompt, review, refine

The loop that makes Copilot useful is the same one you'll run all day: **prompt → review → refine**. If the first answer isn't right, rephrase or break it down — don't just accept it.

## Four habits that pay off

- **Play to its strengths.** Copilot is great at tests, repetitive code, explaining code, debugging syntax, and regex. It's not there to replace your judgement.
- **Give it context.** Open the relevant files, reference specific `@file` paths — not whole directories. The right context in beats a bigger prompt.
- **Be specific, give an example.** State the input, the desired output, and one example. Vague in, vague out.
- **Right-size the model.** A mid-tier model handles most work; save the heavy reasoning model for genuinely hard problems.

![Two side-by-side terminal panels. Left, labelled Expensive: a vague prompt asking Copilot to scan the whole repo and fix everything. Right, labelled Efficient: a focused prompt naming one file, one function, one case, in plan mode.]({{ '/assets/img/prompt-compare.png' | relative_url }})
