---
mode: agent
description: Turn user stories into a lightweight requirements spec (functional, non-functional, acceptance criteria).
---

# Story → Spec

You are helping a mixed team (developers, business analysts, testers, security specialists)
turn user stories into a **lightweight, reviewable requirements spec**. Optimise for clarity
so a non-developer can validate it.

## Inputs
- The user stories in this team's `user-stories.md`.
- The project conventions in `.github/copilot-instructions.md`.

## Task
For the story or stories I point you at, produce a spec section with:

1. **Summary** — one plain-English sentence describing the outcome for the user.
2. **Functional requirements** — numbered, testable statements of what the feature must do.
3. **Non-functional requirements** — must include at least:
   - **Accessibility** (WCAG 2.2 AA — labels, keyboard, contrast, status announcements),
   - **Security** (input validation, no secrets, safe rendering),
   - **Performance / reliability** where relevant.
4. **Acceptance criteria** — in Given/When/Then form, each independently testable.
5. **Out of scope** — what we are deliberately NOT doing today.
6. **Open questions** — anything a BA should confirm.

## Rules
- Keep it tight — this is a half-day build, not a full project.
- Every acceptance criterion must be verifiable by a test or a manual check.
- Do not invent domain rules; if a rule is unclear, put it under **Open questions**.
- Write the output as Markdown suitable to paste into a `spec.md`.
