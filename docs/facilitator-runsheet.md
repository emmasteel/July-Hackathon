# Facilitator run sheet — GitHub Copilot Hackathon

**Wednesday 22 July 2026 · 09:00–13:00 AEST (lunch at 13:00)**
Audience: ~12 people, 2 teams of 6, mixed roles and coding confidence. BYOD.

This is your minute-by-minute guide with talking points, checkpoints, live-demo cues, and
"if a team is stuck" hints. Participant-facing timing is in [../AGENDA.md](../AGENDA.md).

---

## Before the day (organiser checklist)

- [ ] Resolve every 〔bracketed〕 TODO in the repo (licensing, stack, venue, contacts). See the
      "Organiser TODO" list in the handover.
- [ ] Confirm Copilot access path for all participants (org seats vs Copilot Free) and that
      [PREREQUISITES.md](../PREREQUISITES.md) reflects it.
- [ ] Do a full dry run: clone → `npm install` → `npm run verify` → `npm run dev` in **both**
      team tracks on a clean machine.
- [ ] Decide the git workflow (fork / branch / local-only) and note it in
      [CONTRIBUTING.md](../CONTRIBUTING.md).
- [ ] Prepare the room: power, screen/projector, guest Wi-Fi, whiteboard, two team tables.
- [ ] Print or pin: the agenda, the objectives, and each team's use case.
- [ ] Assign a facilitator/floater to each team (ideally one who can pair on code).
- [ ] Have a fallback: a phone hotspot and a couple of spare laptops with the stack installed.

---

## 09:00–09:30 · Arrival & setup check

**Goal:** everyone signed in, Copilot working, repo running — before content starts.

- Greet people, seat them with their team.
- Walk each person through the **"You're ready when…"** self-check in
  [PREREQUISITES.md](../PREREQUISITES.md).
- **Copilot sanity test** (do this with anyone unsure):
  1. Open the repo in VS Code; confirm the Copilot status-bar icon is active.
  2. Open Copilot Chat (Ctrl/Cmd+Alt+I), ask *"What does this repo do?"* — it should read the
     `copilot-instructions.md` context.
  3. In a `.ts` file, type `// add two numbers` and confirm a grey suggestion appears.
- Common fixes: not signed in (Accounts menu → sign in), extension disabled, org seat not
  assigned (have the admin ready), corporate proxy blocking Copilot (hotspot fallback).

**Checkpoint:** every participant has run `npm run verify` successfully.

---

## 09:30–09:45 · Welcome & framing

**Talking points:**
- Why "Copilot-first": today isn't about finishing tasks, it's about learning to **prompt,
  review, and refine** Copilot — a skill every role can use.
- Everyone has a lane: BAs (spec + acceptance criteria), testers (unit + automation +
  accessibility), security (review + scanning), developers (build + CI). Show the role table.
- Introduce the two use cases (ABR accessibility; grants/eligibility checker).
- Frame the work: **core spine first (C1–C5), stretch goals are extras.**
- Set the tone: mixed skill levels welcome; ask for help early; no secrets/real data.

---

## 09:45–10:15 · C1 — Repo & Copilot setup

**Goal:** each team has a customised `copilot-instructions.md` and uses a prompt file.

**Live demo (5 min):** open [../.github/copilot-instructions.md](../.github/copilot-instructions.md),
show the four rule areas (conventions, testing, security, accessibility). Then show a
before/after: ask Copilot to "build a search input" **without** and **with** the accessibility
rules loaded — highlight how it starts adding labels and focus handling.

**Team task:** fill in the team-specific section (§7) of their copy for their use case, and try
the `story-to-spec` prompt once.

**If stuck:** point them at the existing example — they only need to add a few domain lines
(e.g. "an ABN is 11 digits; never call the live ABR").

**Checkpoint:** each team can show one difference in Copilot's output after editing instructions.

---

## 10:15–11:00 · C2 → C3 — Stories to spec, start building

**Goal:** a `spec.md` covering ≥2 stories; core feature scaffolding underway.

**Live demo (5 min):** open a team's `user-stories.md`, run the
[story-to-spec prompt](../.github/prompts/story-to-spec.prompt.md), and show how it separates
functional, non-functional (accessibility + security!), and acceptance criteria. Emphasise
**reviewing** the output — BAs should correct anything wrong.

**Team task:** BAs drive the spec; developers start `src/lib/` logic and `src/components/` UI
from the acceptance criteria.

**If stuck:** shrink scope — one story, one happy path. The starter apps already have a working
skeleton; they extend it rather than start blank.

**Checkpoint:** spec exists; the app still runs (`npm run dev`).

---

## 11:00–11:45 · C3 cont. + C4 — Unit testing

**Goal:** core feature does something useful; unit tests pass with a real edge case added.

**Live demo (5 min):** open a `*.test.ts` placeholder, run the
[generate-unit-tests prompt](../.github/prompts/generate-unit-tests.prompt.md) on a `lib`
function. Show Copilot's first pass, then **ask it to critique its own coverage** and add an
edge case (e.g. invalid checksum / empty input).

**Team task:** testers lead; get `npm test` green; add at least one edge case beyond Copilot's
first suggestion.

**If stuck:** remind them logic lives in `src/lib/` and is pure — easiest thing to test. Start
with one function.

**Checkpoint:** `npm test` passes; team can name one weak test they strengthened.

---

## 11:45–12:20 · C5 — Test automation

**Goal:** an automated e2e/regression check runs against fixtures.

**Live demo (5 min):** open the Playwright starter spec, show it driving the UI. Stress: **use
the fixtures, never the live gov site.** Run `npm run test:e2e`.

**Team task:** developers/testers pair to make the e2e test exercise their feature end-to-end.

**If stuck:** the starter spec already loads the app and asserts on the page — they just point
it at their new UI elements.

**Checkpoint:** e2e test runs (pass or a legitimate, explainable fail).

---

## 12:20–12:50 · Stretch goals (pick any)

**Goal:** try one or more independent goals. No goal blocks another.

Circulate and nudge based on team strengths:
- **Security folks → S1**: run the [security-review prompt](../.github/prompts/security-review.prompt.md),
  fix one finding, uncomment a scan job in [ci.yml](../.github/workflows/ci.yml).
- **Testers → S2**: run the [a11y-review prompt](../.github/prompts/a11y-review.prompt.md) and
  the axe-core check.
- **Developers → S3**: extend the CI workflow.
- **BAs/writers → S4**: update README + write an ADR.
- **Anyone → S5**: refactor [../samples/legacy-snippet/](../samples/legacy-snippet/).

**Checkpoint:** each team attempted at least one stretch goal.

---

## 12:50–13:00 · Show-and-tell & wrap

- Each team: **3–4 minutes** — demo the feature, and (most important) show **one great Copilot
  moment** and **one time they caught/corrected Copilot**.
- Celebrate what each team built and learned.
- Thank everyone; note follow-ups (which TODOs the organiser will confirm; whether to keep building).

---

## Timing buffers & contingencies

- Every block has slack; if the room is moving fast, push more people into stretch goals early.
- If setup ran long, compress C1 to 20 min by using the example instructions as-is.
- If Copilot/network is flaky for some: pair them with a working machine; Copilot works
  offline for nothing, so a hotspot is the key fallback.
- **Protect the spine:** it's better for a team to finish C1–C5 than to chase stretch goals.

## Live-demo cheat sheet (Copilot features to show)

- **Inline completions** (grey ghost text, `Tab` to accept).
- **Copilot Chat** (`Ctrl/Cmd+Alt+I`) — ask about the repo; it uses `copilot-instructions.md`.
- **Prompt files** — run `.github/prompts/*.prompt.md` from chat.
- **/tests, /fix, /explain** slash commands in chat.
- **Reviewing suggestions** — accept partially, edit, or reject; show that you stay in control.
