# Accessibility primer — WCAG 2.2 AA (plain English)

You don't need to memorise the standard. This primer gives you the essentials, a checklist, and
a **findings worksheet** so any role can contribute to accessibility work today.

> **Why it matters:** Government services must be accessible. Public-sector digital service
> standards require WCAG conformance. We target **WCAG 2.2 AA**, which builds on the WCAG 2.1 AA
> baseline. 〔**TODO — confirm the exact required baseline with your organisation.**〕 Accessibility isn't a
> "nice to have" — for public and internal services it's an obligation, and it makes the product better for
> everyone.

---

## The four principles (POUR)

1. **Perceivable** — people can perceive the content (text alternatives, contrast, structure).
2. **Operable** — people can operate it (keyboard, enough time, no traps, big-enough targets).
3. **Understandable** — it's clear and predictable (labels, error messages, consistent layout).
4. **Robust** — it works with assistive tech (semantic, valid markup; status announcements).

---

## The "top 10" checks for today's web features

Use this as your quick review. Each maps to a WCAG 2.2 success criterion (SC).

| # | Check | WCAG SC |
| --- | --- | --- |
| 1 | Every input/control has a **visible label** (not placeholder-only). | 1.3.1, 3.3.2 |
| 2 | Real **semantic elements** used (`<button>`, `<nav>`, `<main>`, ordered headings). | 1.3.1, 4.1.2 |
| 3 | Everything works with the **keyboard alone** (Tab/Enter/Space), no mouse needed. | 2.1.1 |
| 4 | No **keyboard trap** — you can Tab out of every component. | 2.1.2 |
| 5 | **Visible focus indicator** on the currently focused element. | 2.4.7 |
| 6 | Text **contrast** ≥ 4.5:1 (3:1 for large text and UI components). | 1.4.3, 1.4.11 |
| 7 | **Colour isn't the only signal** (e.g. errors also have text/icon, not just red). | 1.4.1 |
| 8 | **Dynamic updates & errors are announced** (`aria-live`, `role="alert"`, `aria-describedby`). | 4.1.3, 3.3.1 |
| 9 | Images have appropriate **alt text** (empty `alt=""` for decorative). | 1.1.1 |
| 10 | Interactive **targets are large enough** and not too crowded. | 2.5.8 |

New in WCAG 2.2 worth noting: **2.4.11 Focus Not Obscured**, **2.5.8 Target Size (Minimum)**,
**3.3.8 Accessible Authentication** (avoid cognitive-heavy auth puzzles).

---

## How Copilot helps (stretch goal S2)

- The accessibility rules in [../.github/copilot-instructions.md](../.github/copilot-instructions.md)
  make Copilot **proactively flag** likely violations and suggest accessible alternatives as it
  writes UI.
- The [a11y-review prompt](../.github/prompts/a11y-review.prompt.md) does a structured review of
  a component and maps issues to SC references.
- The **axe-core** check (wired through Playwright in each team track) catches many issues
  **automatically** — but remember axe finds roughly a third to half of issues; the rest need a
  human (keyboard test, screen-reader spot check, judgement on contrast/meaning).

**Rule of thumb:** automated check + keyboard-only walkthrough + the checklist above = a solid
pass for a hackathon feature.

---

## Findings worksheet

Copy this table into your team's accessibility worksheet (each track has one) and fill it in as
you review.

| # | Where (page/component/URL) | Issue | WCAG SC | Severity (blocker/serious/minor) | Suggested fix | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | ☐ open ☐ fixed |
| 2 | | | | | | ☐ open ☐ fixed |
| 3 | | | | | | ☐ open ☐ fixed |
| 4 | | | | | | ☐ open ☐ fixed |
| 5 | | | | | | ☐ open ☐ fixed |

---

## Handy references

- WCAG 2.2 at a glance: <https://www.w3.org/WAI/WCAG22/quickref/>
- Understanding WCAG 2.2: <https://www.w3.org/WAI/WCAG22/Understanding/>
- Writing for web accessibility (W3C WAI):
  <https://www.w3.org/WAI/tips/writing/>
- axe-core rules: <https://dequeuniversity.com/rules/axe/>
