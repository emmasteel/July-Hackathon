[← Back to home](../../index.html)

# Accessibility findings worksheet — Team 1

Use this to record WCAG 2.2 AA findings. See the
[WCAG primer](../../docs/accessibility-wcag-primer.md) for the "top 10" checks and success
criteria references. This supports stretch goal **S2**.

Analyse three things:
1. The provided fixture [`fixtures/abr-sample-results.html`](fixtures/abr-sample-results.html)
   (it has planted issues).
2. Your own app (run `npm run test:e2e` for the axe-core check + do a keyboard walkthrough).
3. *(Optional, observation only)* the live ABR in a browser — do **not** automate against it.

---

## Findings

| # | Where (fixture / our app / live ABR) | Issue | WCAG SC | Severity | Suggested fix | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | fixture | Search field labelled by placeholder only | 1.3.1 / 3.3.2 | Serious | Add a real `<label for="…">` | ☐ open ☐ fixed |
| 2 | fixture | "Search" is a `<div onclick>` — not keyboard operable | 2.1.1 / 4.1.2 | Blocker | Use a `<button>` | ☐ open ☐ fixed |
| 3 | | | | | | ☐ open ☐ fixed |
| 4 | | | | | | ☐ open ☐ fixed |
| 5 | | | | | | ☐ open ☐ fixed |
| 6 | | | | | | ☐ open ☐ fixed |
| 7 | | | | | | ☐ open ☐ fixed |
| 8 | | | | | | ☐ open ☐ fixed |

> Rows 1–2 are filled in as examples. Find the rest of the planted issues in the fixture
> (there are 7), then add findings from your own app and any live-site observations.

---

## Keyboard walkthrough checklist (our app)

- [ ] I can Tab to the ABN field.
- [ ] I can type and submit with Enter (no mouse).
- [ ] The focused element always has a **visible** focus indicator.
- [ ] After submitting, the result/error is announced (screen reader or expectation noted).
- [ ] I can Tab through results without getting trapped.

## Automated check (axe-core)

- [ ] `npm run test:e2e` passes with **zero** axe violations.
- [ ] If any violation appears, record it above and fix it.

## Reflection (for the show-and-tell)

- Which issue did **Copilot** help you find or fix? _______________________________________
- Which issue needed a **human** (not caught by axe)? ____________________________________
