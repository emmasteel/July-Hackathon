# GitHub Copilot instructions — GitHub Copilot Hackathon

> **This file is both a working example and a teaching tool.** It shows Copilot how to behave
> in *this* repo, and it demonstrates (Objective **C1**) how *you* should write instructions
> for your own project. Read it, then adapt the team-specific parts for your track.
>
> Copilot automatically reads this file and applies it to chat and code suggestions across the
> repository. Keep it concise, specific, and opinionated — vague instructions produce vague help.

---

## 1. Project context

This repository is a hands-on hackathon for building **public-facing government web
features** with GitHub Copilot. Two teams build small, accessible, secure web apps:

- **Team 1 (`teams/team-1-abr/`)** — an accessible ABN lookup/results experience, plus
  accessibility analysis of the Australian Business Register.
- **Team 2 (`teams/team-2-grant-finder/`)** — an accessible grants / eligibility checker.

Audience includes non-developers. **Favour clarity over cleverness.** Explain non-obvious
choices in short comments.

## 2. Coding conventions

- **Language:** TypeScript in `strict` mode. No implicit `any`. Prefer explicit return types
  on exported functions.
- **Stack:** Vite + React (function components + hooks). Vitest for unit tests, Playwright
  for e2e/accessibility.
- **Style:** small, pure functions for logic; keep components thin. Separate **pure logic**
  (e.g. `src/lib/`) from **UI** (`src/components/`) so logic is easy to unit-test.
- **Naming:** `camelCase` for variables/functions, `PascalCase` for components/types,
  `SCREAMING_SNAKE_CASE` for constants.
- **Folder layout per team track:**
  ```
  src/
    lib/          pure logic (validation, eligibility, formatting) — unit tested
    components/    React UI components
    App.tsx        composes the feature
  tests/           Vitest unit tests (*.test.ts)
  tests/e2e/       Playwright specs (*.spec.ts)
  fixtures/        static sample data — NEVER call live sites
  ```
- Prefer standard library / platform APIs over new dependencies. If you add a dependency,
  justify it in a comment or ADR.

## 3. Testing expectations

- **Always add or update tests when you add or change behaviour.** Treat untested logic as
  unfinished.
- Unit-test pure logic in `src/lib/` directly. Cover the **happy path plus edge cases**:
  empty input, invalid input, boundary values, and error conditions.
- When you generate tests, **also generate at least one failing/edge case** — don't only test
  the obvious success path.
- E2E tests must use the provided **fixtures** in `fixtures/`. **Never** call
  `abr.business.gov.au`, `business.gov.au`, or any live site from a test.
- Name tests by behaviour: `it('rejects an ABN with an invalid checksum', ...)`.

## 4. Security rules

Apply these proactively and **flag violations you notice in existing or generated code**:

- **Validate all input at the boundary.** Never trust user input; validate type, length,
  format, and range before use.
- **No secrets in code.** Never hard-code credentials, API keys, tokens, or connection
  strings. Use environment variables loaded from a git-ignored `.env`, and provide a
  `.env.example` with placeholders.
- **Avoid injection & unsafe DOM.** Do not build HTML by string concatenation with user input.
  Never use `dangerouslySetInnerHTML` with untrusted data. Prefer safe React rendering.
- **Encode/escape output** appropriately for its context.
- **Dependency hygiene.** Prefer maintained packages; avoid abandoned ones. Assume `npm audit`
  and dependency review run in CI.
- When you generate code that touches input handling, **add a brief comment noting the
  validation** you applied, so reviewers can see the intent.

## 5. Accessibility rules (WCAG 2.2 AA)

Public-sector digital service standards require WCAG conformance
〔**TODO — confirm the exact baseline with your organisation; treat WCAG 2.2 AA as the target, which is a
superset of the WCAG 2.1 AA baseline**〕. **Proactively flag** when generated or existing UI may
breach WCAG 2.2 AA, and **suggest the accessible alternative**. Specifically:

- **Labels & names:** every form control has an associated, visible `<label>` (or an accessible
  name). Flag inputs with placeholder-only labelling.
- **Semantic markup:** use real semantic elements (`<button>`, `<nav>`, `<main>`, headings in
  order). Flag `<div onclick>` used as a button or clickable `<span>`s.
- **Keyboard access:** every interactive element must be reachable and operable by keyboard,
  with a **visible focus indicator**. Flag keyboard traps and missing focus management (e.g.
  after opening a dialog or showing results).
- **Colour & contrast:** flag text/background combinations likely below 4.5:1 (3:1 for large
  text / UI components). Never use colour as the **only** way to convey meaning.
- **Status & errors:** announce dynamic results and validation errors to assistive tech (e.g.
  `aria-live`, `role="alert"`, `aria-describedby` on the field). Flag silent updates.
- **Images & icons:** meaningful images need `alt` text; decorative ones use `alt=""`.
- **Target size & spacing:** interactive targets should meet WCAG 2.2's minimum target size.

When you produce UI, **include a short "a11y note"** in your response listing which of the
above you addressed and any residual risks to verify with the Playwright accessibility checks
and a keyboard walkthrough.

## 6. How to help this audience

- Explain **why**, not just **what** — many participants are BAs, testers, or security
  specialists building confidence with the tooling.
- When asked to build something, prefer **small, reviewable steps**. Offer to explain any
  suggestion in plain English.
- When turning user stories into a spec, always separate **functional** requirements,
  **non-functional** requirements (include accessibility + security), and **acceptance
  criteria**.

## 7. Team-specific instructions 〔fill in during C1〕

> During Objective C1, add a short section here describing YOUR feature's domain rules. Example
> for Team 1: *"An ABN is 11 digits; validate using the ATO weighting algorithm; never call the
> live ABR — use `fixtures/abr-sample.html`."* Example for Team 2: *"Eligibility rules live in
> `src/lib/eligibility.ts`; a grant match must explain why it matched."*
