# GitHub Copilot Hackathon 🚀

A half-day, hands-on hackathon that teaches teams to build a public-facing government web
feature **with GitHub Copilot** — from user stories to spec, code, tests, automation,
security, and accessibility.

> **Event:** GitHub Copilot Hackathon <br />
> **When:** Wednesday 22 July 2026, 09:00–14:00 AEST (content 09:30–13:00, lunch after) <br />
> **Where:** Microsoft Canberra | Lv 4, 6 National Cct <br />
> **Facilitator:** [Emma Steel - Solution Engineer, Microsoft](mailto:emma.steel@microsoft.com) <br />
> **Audience:** ~12 participants, 2 teams of 6 (developers, business analysts, testers, <br />
> cybersecurity specialists)

---

## Why this repo exists

Every objective here is framed as *doing the task **with** Copilot*, not just finishing the
task. You will learn to **prompt, review, and refine** Copilot output - a skill that applies
whether you write code, user stories, test plans, or security reviews.

This repository is **public** and safe to clone before the event. There are **no secrets,
credentials, or customer data** in it. Please keep it that way (see [SECURITY.md](SECURITY.md)). 🔒

---

## Read these first (before 22 July)

| Do this | File |
| --- | --- |
| ✅ Complete the setup checklist | [PREREQUISITES.md](PREREQUISITES.md) |
| 🧭 Understand how the day runs | [AGENDA.md](AGENDA.md) |
| 🎯 See what "done" looks like | [OBJECTIVES.md](OBJECTIVES.md) |
| 💡 Learn to set up Copilot for a project | [.github/copilot-instructions.md](.github/copilot-instructions.md) |

New to some of the tooling? Start with the [Glossary](docs/glossary.md) — written for BAs,
testers, and security folks, not just developers.

---

## Everyone has a meaningful role

You do **not** need to be a coder to contribute. Each objective has a path for every role:

| Role | Where you shine |
| --- | --- |
| **Business analyst** | Turn user stories into a crisp spec (C2), write acceptance criteria, keep scope honest |
| **Tester** | Drive unit + automated tests (C4/C5), find edge cases, run the accessibility scan (S2) |
| **Cybersecurity** | Lead the security review + scanning (S1), threat-model the feature |
| **Developer** | Build the feature from the spec (C3), pair with Copilot, wire up CI (S3) |

---

## The two team tracks

Both teams hit the **same core objectives** and choose from the **same stretch-goal menu** —
only the use case differs.

| Team | Use case | Track |
| --- | --- | --- |
| **Team 1 - ABR** | Accessibility analysis of the Australian Business Register + an accessible ABN lookup feature | [teams/team-1-abr/](teams/team-1-abr/) |
| **Team 2 - Grant Finder** | An accessible business.gov.au grants / eligibility checker | [teams/team-2-grant-finder/](teams/team-2-grant-finder/) |

---

## Core objectives (the shared spine)

Do these in order - each builds on the last.

1. **C1 - Set up the repo for Copilot** (`copilot-instructions.md`, prompt files, conventions)
2. **C2 - Stories → spec** (functional + non-functional + acceptance criteria)
3. **C3 - Build the core feature** from the spec
4. **C4 - Unit testing** with Copilot (generate, review, strengthen)
5. **C5 - Test automation** (an end-to-end / regression check)

## Stretch goals (bonus - independent, pick any)

- **S1 - Security-first**: find + fix vulns, wire up scanning (CodeQL / secret scanning / dependency review)
- **S2 - Accessibility-by-default**: get Copilot to flag likely WCAG 2.2 AA issues + automated Playwright accessibility check
- **S3 - CI/CD**: a GitHub Actions pipeline (build + test + scans)
- **S4 - Documentation**: README, ADRs, inline docs
- **S5 - Legacy modernisation**: refactor a small legacy snippet ([samples/legacy-snippet/](samples/legacy-snippet/))

Full detail and "definition of done" for each: [OBJECTIVES.md](OBJECTIVES.md)

---

## Default technology stack

The starter apps use a lightweight, widely-approachable web stack so every objective is easy
to demonstrate:

- **TypeScript + Vite + React** - fast to run, minimal config
- **Vitest** - unit tests
- **Playwright** - end-to-end + accessibility checks

---

## Quick start (per team)

```bash
# 1. Clone
git clone <this-repo-url>
cd github-copilot-hackathon

# 2. Move into your team's track
cd teams/team-1-abr        # or teams/team-2-grant-finder

# 3. Install and verify
npm install
npm run dev                # starts the local dev server
npm test                   # runs the (placeholder) unit tests
```

Full setup + troubleshooting: [PREREQUISITES.md](PREREQUISITES.md) and
[docs/copilot-setup-guide.md](docs/copilot-setup-guide.md).

---

## Repository map

```
.
├── README.md                     ← you are here
├── PREREQUISITES.md              ← complete BEFORE the event
├── AGENDA.md                     ← participant run sheet
├── OBJECTIVES.md                 ← C1–C5 + S1–S5 with definitions of done
├── LICENSE                       ← MIT
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── .github/
│   ├── copilot-instructions.md   ← worked example (Objective C1)
│   ├── prompts/                  ← reusable .prompt.md files
│   ├── workflows/                ← starter CI
│   └── ISSUE_TEMPLATE/           ← user-story template
├── docs/
│   ├── facilitator-runsheet.md   ← minute-by-minute facilitator guide
│   ├── copilot-setup-guide.md
│   ├── accessibility-wcag-primer.md
│   └── glossary.md
├── teams/
│   ├── team-1-abr/
│   └── team-2-grant-finder/
└── samples/
    └── legacy-snippet/           ← S5 refactor module
```

---

## Licence

Released under the [MIT Licence](LICENSE). Contributions welcome per
[CONTRIBUTING.md](CONTRIBUTING.md) and the [Code of Conduct](CODE_OF_CONDUCT.md).
