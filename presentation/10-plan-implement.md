---
layout: slide
title: "Plan, then build to the plan"
accent: create
section: "Create · plan so we have a plan"
nav_order: 9
prev: "09-custom-instructions"
next: "11-review"
---

# Plan, then build to the plan

With a spec in hand, ask the agent to turn it into a **phased plan** — each phase with a goal and a way to verify it. Approve the plan, then implement phase by phase, checking each before moving on. This is your **C3**.

## Why plan first

- Plan mode costs one prompt and drives the rest — Copilot targets the work instead of scanning everything.
- You catch problems *before* they ship, when they're cheap to fix.
- Each phase has a check: "renders identically", "headings in order, contrast measured", "works on phone, tablet, laptop", "walk every acceptance criterion".

<div class="callout">
Break big asks into steps. Let Copilot generate after each step, not all at once.
</div>

<p class="pixel">In your IDE this is Plan mode; in the CLI it's /plan. Same idea: think before you build.</p>
