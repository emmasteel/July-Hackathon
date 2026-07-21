---
layout: slide
title: "Teach Copilot your project"
accent: create
section: "Create · set the ground rules"
nav_order: 8
prev: "08-specify"
next: "10-plan-implement"
---

# Teach Copilot your project

`copilot-instructions.md` is the always-on context Copilot reads on *every* request. Write your team's standing rules once, and you stop repeating them in every prompt. This is your **C1**.

## Tailoring it for a FedGov project team

Public-sector work carries rules Copilot can't infer from the code. Make them explicit:

| Area | Rules worth encoding |
| --- | --- |
| **Accessibility** | WCAG 2.2 AA is non-negotiable. Semantic HTML, keyboard-first, visible focus, AA contrast, alt text. |
| **Security & privacy** | No secrets, credentials, or PII in code, prompts, or commits. Validate and sanitise all input. Treat all data as public sample data. |
| **Data handling** | Never call live government services. Use local fixtures only. |
| **Standards** | Your stack and conventions (e.g. .NET / Blazor), naming, and the testing you expect. |
| **"Do not" rules** | Don't add dependencies without approval. Don't touch build output. Don't invent government data. |

<div class="callout tinted">
Keep it <mark>lean</mark>. Every line is re-sent on every request — it's high-cost configuration, not documentation. Standards the model can't infer, explicit "do not" rules, one line of tech-stack context. Link to full style guides rather than pasting them.
</div>

<p class="pixel">Team 1: add ABR rules — "an ABN is 11 digits; never call the live ABR."</p>
