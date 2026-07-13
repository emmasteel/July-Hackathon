[← Back to home](../../../index.html)

# Team 2 — Grant Finder / eligibility checker

**Use case:** Small businesses struggle to find grants they qualify for on
[business.gov.au](https://business.gov.au). Your team will build a small, **accessible
eligibility checker**: a user enters their business profile and gets a list of grants they may
be eligible for — with a clear explanation of **why** each grant matched or didn't.

> **Ground rules**
> - **Never scrape or automate calls to business.gov.au.** Use the static fixtures in
>   [`fixtures/`](../fixtures/). Your app and tests use local sample data only.
> - This demo is **not** eligibility or financial advice — make that clear in the UI (the
>   starter already does).

---

## What's already here (your starting point)

A working, accessible React skeleton you will extend:

```
src/
  lib/eligibility.ts        eligibility rules + validation — pure, unit-tested
  components/GrantFinder.tsx accessible profile form + explained results
  App.tsx
tests/
  eligibility.test.ts       starter unit tests (extend in C4)
  GrantFinder.test.tsx      starter component test
  e2e/grant-finder.spec.ts  Playwright e2e + accessibility checks (C5 / S2)
fixtures/
  grants-sample-data.json   sample grants with eligibility rules
```

Run it:

```bash
npm install
npm run dev        # open http://localhost:5174
npm test           # unit tests
npm run test:e2e   # end-to-end + accessibility (installs browsers first time)
```

---

## Your objectives today

Follow the core spine in [OBJECTIVES.md](../../../OBJECTIVES.md):

1. **C1** — Customise [.github/copilot-instructions.md](../../../.github/copilot-instructions.md)
   §7 with grant-finder domain rules (e.g. "a match must explain why it matched; never call
   business.gov.au").
2. **C2** — Turn [user-stories.md](../user-stories.md) into a `spec.md` (use the
   [story-to-spec prompt](../../../.github/prompts/story-to-spec.prompt.md)).
3. **C3** — Build the next story's feature from your spec.
4. **C4** — Strengthen the unit tests (see the TODOs in `tests/`).
5. **C5** — Extend the e2e/regression test.

Then pick any stretch goals (S1–S5). The accessibility worksheet supports **S2**.

---

## Domain notes

- **Eligibility rules** live in [`src/lib/eligibility.ts`](../src/lib/eligibility.ts). A grant can
  restrict by state, industry, max employees, max turnover, and minimum years trading. A
  missing rule means "no restriction".
- **Transparency:** every result carries `reasonsFor` / `reasonsAgainst` — a match must always
  explain itself. Keep this principle as you extend the feature.
- **Sample grants:** six in [`fixtures/grants-sample-data.json`](../fixtures/grants-sample-data.json),
  including broad and narrow eligibility so you can demo different outcomes.
- 〔**TODO — organiser:** confirm whether you want the sample grants replaced with real
  (public) business.gov.au grant criteria.〕
