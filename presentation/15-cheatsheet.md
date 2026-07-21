---
layout: slide
title: "Cheatsheet"
accent: start
section: "Take it into the hack"
nav_order: 14
prev: "14-close"
next: "index"
---

# Cheatsheet — take it into the hack

## The loop
**Explore** → **Create** (Specify → Plan → Implement → Review) → **Survive** (Learn). You can always step back a phase.

## Prompt, review, refine
- Play to Copilot's strengths: tests, boilerplate, explaining, debugging, regex.
- Give context: open the right files, reference `@file` paths, not directories.
- Be specific; give one example of input and desired output.
- Break big asks into steps; review before you accept.

## `copilot-instructions.md` (keep it lean)
Accessibility (WCAG 2.2 AA) · no secrets/PII · fixtures not live services · stack &amp; conventions · explicit "do not" rules.

## Token-aware
`/clear` between tasks · `/model` to match the task · `/usage` to see the cost · reference files, not `src/`.

## Where to look
- Your team track: `teams/team-1-abr/` or `teams/team-2-grant-finder/`
- `OBJECTIVES.md` — the checklist of what each objective needs
- `.github/prompts/` — reusable prompts that speed up every objective
- GitHub best practices: [docs.github.com/copilot](https://docs.github.com/en/copilot/get-started/best-practices)
