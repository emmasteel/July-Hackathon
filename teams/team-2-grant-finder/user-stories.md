# Team 2 — user stories (Grant Finder)

Pre-populated backlog for the accessible grant eligibility checker. Sized so you can build
**2–3** during the event; leave the rest as backlog. Use the
[story-to-spec prompt](../../.github/prompts/story-to-spec.prompt.md) to turn these into a spec.

Story 1 is **already implemented** in the starter skeleton — use it to learn the flow, then
build Story 2 onward with Copilot.

〔**TODO — organiser:** confirm these stories match the agreed Team 2 use case.〕

---

## Story 1 — Find grants from a business profile *(implemented as the starter)*

**As a** small business owner
**I want** to enter my business details and see grants I may be eligible for
**so that** I don't have to read every grant's fine print.

**Acceptance criteria**
- Given a complete, valid profile, when I submit, then I see a list of grants with eligible
  ones first.
- Each grant shows the amount and an explanation of why it matches or doesn't.
- All form fields have visible labels and the form works with keyboard only.

**Non-functional:** input validated before use; results announced to assistive tech.

---

## Story 2 — Clear, accessible validation

**As a** user who leaves a field blank or enters something invalid
**I want** clear, specific error messages
**so that** I can complete the form correctly.

**Acceptance criteria**
- Given a missing state or industry, when I submit, then I see a specific error for that field.
- Given a negative or non-numeric value, when I submit, then I see a helpful error.
- Errors appear in an announced summary (`role="alert"`) and each field is `aria-invalid` with
  its message linked via `aria-describedby`.

---

## Story 3 — Explain why a grant does NOT match

**As a** user who is not eligible for a grant
**I want** to understand which criterion I failed
**so that** I know what would need to change.

**Acceptance criteria**
- Given an ineligible grant, when I view it, then I see the specific reason(s) it doesn't match
  (e.g. "Only available in VIC, TAS, SA, NT").
- The distinction between eligible and ineligible is conveyed by text, not colour alone.

---

## Story 4 — Filter to only eligible grants

**As a** user
**I want** a toggle to show only grants I'm eligible for
**so that** I can focus on what I can apply for.

**Acceptance criteria**
- Given results are shown, when I turn on "eligible only", then ineligible grants are hidden.
- The toggle has a visible label, is keyboard operable, and the result count updates and is
  announced.

---

## Story 5 — Sort grants by amount

**As a** user
**I want** to sort grants by dollar amount
**so that** I can see the largest opportunities first.

**Acceptance criteria**
- Given results are shown, when I choose "sort by amount", then grants reorder highest-first.
- Sorting keeps eligible grants distinguishable and remains keyboard/screen-reader friendly.

---

## Story 6 — Save my profile for this session

**As a** user checking a few scenarios
**I want** my entered profile to stay filled in
**so that** I can tweak one value and re-check.

**Acceptance criteria**
- Given I submitted once, when results show, then my inputs remain in the form.
- Given I change one field and resubmit, then results update accordingly.

**Security note:** keep the profile in memory only; do not persist personal/business data.

---

## Story 7 — Link out to each grant's details *(backlog)*

**As a** user
**I want** a link to read more about a grant
**so that** I can decide whether to apply.

**Acceptance criteria**
- Given a grant card, when I select "Learn more", then I'm taken to that grant's details page.
- Links have descriptive accessible names (not "click here") and clear focus styles.

> For the hackathon, link to a placeholder/fixture page — do not deep-link the live site in
> tests.

---

## Story 8 — Plain-language guidance and disclaimer *(backlog)*

**As a** first-time user
**I want** brief guidance and a clear disclaimer
**so that** I understand this is a guide, not official advice.

**Acceptance criteria**
- Given the page loads, when I read the intro, then I understand what to enter and that results
  are indicative only.
- The disclaimer is programmatically associated and readable by assistive tech.
