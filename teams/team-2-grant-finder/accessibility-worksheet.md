[← Back to home](../../index.html)

# Accessibility findings worksheet — Team 2

Use this to record WCAG 2.2 AA findings for the grant finder. See the
[WCAG primer](../../docs/accessibility-wcag-primer.md) for the "top 10" checks and success
criteria references. This supports stretch goal **S2**.

Analyse:
1. Your own app (run `npm run test:e2e` for the axe-core check + do a keyboard walkthrough).
2. *(Optional, observation only)* a real grants page on business.gov.au in a browser — do
   **not** automate against it.

---

## Findings

| # | Where (our app / live site) | Issue | WCAG SC | Severity | Suggested fix | Status |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | | | | | | ☐ open ☐ fixed |
| 2 | | | | | | ☐ open ☐ fixed |
| 3 | | | | | | ☐ open ☐ fixed |
| 4 | | | | | | ☐ open ☐ fixed |
| 5 | | | | | | ☐ open ☐ fixed |
| 6 | | | | | | ☐ open ☐ fixed |

---

## Keyboard walkthrough checklist (our app)

- [ ] I can Tab through every field (state, industry, employees, turnover, years).
- [ ] I can complete and submit the whole form with keyboard only.
- [ ] The focused element always has a **visible** focus indicator.
- [ ] After submitting, errors or results are announced.
- [ ] I can Tab through the results without getting trapped.

## Form-specific checks (this feature has several fields)

- [ ] Every field has a visible `<label>` (not placeholder-only).
- [ ] The error summary is announced (`role="alert"`) and lists each problem.
- [ ] Each invalid field is marked `aria-invalid` and links its message via `aria-describedby`.
- [ ] Eligible vs ineligible is clear in **text**, not colour alone.

## Automated check (axe-core)

- [ ] `npm run test:e2e` passes with **zero** axe violations.
- [ ] If any violation appears, record it above and fix it.

## Reflection (for the show-and-tell)

- Which issue did **Copilot** help you find or fix? _______________________________________
- Which issue needed a **human** (not caught by axe)? ____________________________________
