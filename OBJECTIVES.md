[← Back to home](index.html)

# Objectives & Definitions of Done

Every objective is about **doing the task with GitHub Copilot** — prompting it, reviewing
its output, and refining. "Done" means the outcome exists **and** you can explain how Copilot
helped and where you corrected it.

---

## Core objectives (C1–C5) — the shared spine

Complete these in order — each builds on the last. The core spine is the heart of the day,
so aim to finish all five.

### C1 — Set up the repo for best use with GitHub Copilot
**Do:** Author or customise `.github/copilot-instructions.md` for your team's use case, add at
least one reusable prompt file, and make Copilot aware of your conventions.

**Definition of done**
- [ ] `.github/copilot-instructions.md` exists and covers **coding conventions, testing
      expectations, security rules, and accessibility rules**.
- [ ] At least one `.prompt.md` file in `.github/prompts/` is used during the event.
- [ ] You can show a before/after where the instructions changed Copilot's output.

### C2 — Turn user stories into a lightweight requirements spec
**Do:** Use Copilot to convert your team's pre-populated user stories into a spec with
**functional** requirements, **non-functional** requirements, and **acceptance criteria**.

**Definition of done**
- [ ] A `spec.md` (or similar) in your team folder covering ≥2 stories.
- [ ] Each chosen story has functional + non-functional requirements and testable acceptance
      criteria.
- [ ] Non-functional requirements include at least **accessibility** and **security** lines.

### C3 — Build the core feature from the spec
**Do:** Use Copilot to build the core feature described by your spec.

**Definition of done**
- [ ] The feature runs locally (`npm run dev`) and does something useful for a user.
- [ ] It implements the acceptance criteria for at least one story.
- [ ] You reviewed and corrected Copilot output rather than accepting blindly.

### C4 — Unit testing with Copilot
**Do:** Use Copilot to generate, review, and strengthen unit tests.

**Definition of done**
- [ ] Unit tests exist for the core logic and pass (`npm test`).
- [ ] Tests include at least one **edge case** you added after reviewing Copilot's first pass.
- [ ] You can name one weak test Copilot produced and how you improved it.

### C5 — Test automation
**Do:** Use Copilot to build an automated end-to-end / regression check.

**Definition of done**
- [ ] An automated e2e/regression test exists (Playwright starter provided) and runs.
- [ ] It exercises the feature through the UI (or an equivalent automated flow).
- [ ] It does **not** hit any live government site — it uses the provided fixtures.

---

## Stretch goals (S1–S5) — independent extras

Each stretch goal **extends** the core work but is **independent** of the others. Attempt in
any order; skip any without blocking the rest — they're extras to reach for once your core
spine is solid.

### S1 — Security-first development
**Do:** Use Copilot to find and fix vulnerabilities, and wire up scanning.
**Definition of done**
- [ ] Copilot identified at least one real weakness (input validation, injection, unsafe
      DOM, dependency risk) and you remediated it.
- [ ] At least one automated scan is configured: **CodeQL**, **secret scanning**, or
      **dependency review** via GitHub Actions.

### S2 — Accessibility-by-default
**Do:** Get Copilot to flag likely **WCAG 2.2 AA** issues and add an automated Playwright accessibility check.
**Definition of done**
- [ ] `copilot-instructions.md` contains accessibility rules that made Copilot flag/fix an issue.
- [ ] An automated **accessibility** check runs against your feature (via Playwright) and passes.
- [ ] You captured findings in your team's accessibility worksheet.

### S3 — CI/CD
**Do:** Use Copilot to author a GitHub Actions pipeline.
**Definition of done**
- [ ] A workflow runs **build + unit tests + at least one scan** on push/PR.
- [ ] The workflow is green (or you can explain a legitimate red).

### S4 — Documentation
**Do:** Use Copilot to generate/maintain docs.
**Definition of done**
- [ ] Your team README is updated to describe what you built and how to run it.
- [ ] At least one **ADR** (architecture decision record) captures a real decision you made.
- [ ] Key functions have meaningful inline docs Copilot drafted and you reviewed.

### S5 — Legacy modernisation
**Do:** Use Copilot to refactor the provided legacy snippet.
**Definition of done**
- [ ] The refactored code in [samples/legacy-snippet/](samples/legacy-snippet/) is cleaner,
      typed/tested, and behaviour-preserving.
- [ ] A short note explains what Copilot changed and what you had to correct.
