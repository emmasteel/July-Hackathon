# Team 1 — ABR accessibility analysis & accessible ABN lookup

**Use case:** The Australian Business Register (ABR, <https://abr.business.gov.au>) is a public
government service that appears to have accessibility gaps. Your team will (a) **analyse**
accessibility issues against WCAG 2.2 AA, and (b) **build a small, accessible companion
feature** — an ABN lookup/results experience — that demonstrates doing it right.

> **Ground rules**
> - **Never scrape or automate calls to the live ABR.** Use the static fixtures in
>   [`fixtures/`](fixtures/). Your app and tests use local sample data only.
> - You may *observe* the live site in a browser to inform your accessibility findings, but all
>   automated work uses fixtures.

---

## What's already here (your starting point)

A working, accessible React skeleton you will extend:

```
src/
  lib/abn.ts          ABN validation (ATO checksum) — pure, unit-tested
  lib/lookup.ts       looks up sample data (NO live calls)
  components/AbnLookup.tsx   accessible lookup form + results
  App.tsx
tests/
  abn.test.ts         starter unit tests (extend in C4)
  AbnLookup.test.tsx  starter component test
  e2e/abn-lookup.spec.ts   Playwright e2e + axe-core check (C5 / S2)
fixtures/
  abn-sample-data.json       sample business records
  abr-sample-results.html    imperfect ABR-style markup for a11y practice
```

Run it:

```bash
npm install
npm run dev        # open http://localhost:5173
npm test           # unit tests
npm run test:e2e   # end-to-end + accessibility (installs browsers first time)
```

---

## Your objectives today

Follow the core spine in [../../OBJECTIVES.md](../../OBJECTIVES.md):

1. **C1** — Customise [../../.github/copilot-instructions.md](../../.github/copilot-instructions.md)
   §7 with ABR domain rules (e.g. "an ABN is 11 digits; never call the live ABR").
2. **C2** — Turn [user-stories.md](user-stories.md) into a `spec.md` (use the
   [story-to-spec prompt](../../.github/prompts/story-to-spec.prompt.md)).
3. **C3** — Build the next story's feature from your spec.
4. **C4** — Strengthen the unit tests (see the TODOs in `tests/`).
5. **C5** — Extend the e2e/regression test.

Then pick any stretch goals (S1–S5). The accessibility worksheet supports **S2**.

---

## Accessibility analysis task

Use [../../docs/accessibility-wcag-primer.md](../../docs/accessibility-wcag-primer.md) and the
[accessibility-worksheet.md](accessibility-worksheet.md) in this folder. Analyse:

1. **The provided fixture** [`fixtures/abr-sample-results.html`](fixtures/abr-sample-results.html)
   — it has several planted WCAG issues. Find and record them.
2. **Your own app** — run the axe-core check (`npm run test:e2e`) and do a keyboard-only
   walkthrough.
3. *(Optional, observation only)* the **live ABR** in a browser — note issues you see, but do
   not automate against it.

---

## Domain notes

- **ABN format:** 11 digits, validated with the ATO weighting algorithm (already implemented in
  [`src/lib/abn.ts`](src/lib/abn.ts)).
- **Sample data:** four records in [`fixtures/abn-sample-data.json`](fixtures/abn-sample-data.json),
  including one "Cancelled" entity so you can show status handling accessibly.
- 〔**TODO — organiser:** confirm whether you want any additional real-but-public sample ABNs
  added to the fixture.〕
