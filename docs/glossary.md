[← Back to home](../index.html)

# Glossary

Plain-English definitions for everyone — especially BAs, testers, and security specialists new
to the developer tooling. If a term in the repo is unclear, it's probably here.

## GitHub Copilot & AI tooling

- **GitHub Copilot** — an AI pair-programmer that suggests code and answers questions inside
  your IDE. You stay in control: you review, edit, or reject its suggestions.
- **Copilot Chat** — a chat panel in your IDE where you can ask Copilot questions, get
  explanations, and generate code or tests.
- **Inline suggestion / ghost text** — the grey text Copilot proposes as you type. Press `Tab`
  to accept, `Esc` to dismiss.
- **Prompt** — the instruction you give Copilot. Specific, contextual prompts get better
  results. "Prompting" is the skill of writing good instructions.
- **`copilot-instructions.md`** — a file that tells Copilot your project's rules (conventions,
  testing, security, accessibility) so its suggestions fit your codebase.
- **Prompt file (`.prompt.md`)** — a reusable, saved prompt you can run from Copilot Chat (we
  provide several in `.github/prompts/`).

## Requirements & delivery

- **User story** — a short description of a need in the form *"As a &lt;role&gt; I want
  &lt;goal&gt; so that &lt;benefit&gt;."*
- **Acceptance criteria** — the specific, testable conditions that must be true for a story to
  be "done". Often written *Given / When / Then*.
- **Functional requirement** — *what* the system must do (e.g. "validate the ABN").
- **Non-functional requirement (NFR)** — *how well* it must do it (accessibility, security,
  performance, reliability).
- **Spec** — a lightweight document combining functional + non-functional requirements +
  acceptance criteria.
- **Backlog** — the list of stories not yet done; a place to park scope you won't build today.
- **ADR (Architecture Decision Record)** — a short note capturing a decision and why you made
  it (used in stretch goal S4).

## Testing

- **Unit test** — an automated test of one small piece of logic in isolation (e.g. "does ABN
  validation reject 10 digits?"). We use **Vitest**.
- **End-to-end (e2e) test** — an automated test that drives the whole app like a user would
  (click, type, read results). We use **Playwright**.
- **Regression test** — a test that guards against previously-fixed bugs coming back.
- **Edge case** — an unusual or boundary input (empty, too long, malformed) that often reveals
  bugs.
- **Fixture** — static sample data used by tests so they're fast and don't depend on live
  systems. (We use fixtures instead of hitting real government sites.)
- **axe-core** — a tool that automatically checks a web page for many accessibility problems.

## Security

- **Input validation** — checking that data (from users, files, URLs) is the expected type,
  length, format, and range before using it.
- **Injection** — a class of attack where malicious input is executed as code/commands (e.g.
  SQL injection, script injection). Prevented by validation and safe output handling.
- **Secret** — any credential (password, API key, token). Never commit secrets to a repo.
- **CodeQL** — GitHub's code-scanning engine that finds security bugs in your code.
- **Secret scanning** — GitHub feature that detects committed secrets and can block the push.
- **Dependency review** — a check that flags risky or vulnerable third-party packages in a PR.
- **`npm audit`** — a command that reports known vulnerabilities in your dependencies.
- **OWASP Top 10** — a widely-used list of the most common web application security risks.

## Web & dev stack

- **TypeScript** — JavaScript with type checking, which catches many bugs before you run code.
- **Vite** — a fast tool that runs and builds the web app during development.
- **React** — a library for building user interfaces from components.
- **Component** — a reusable building block of the UI (e.g. a search box).
- **npm** — the tool that installs and runs project dependencies and scripts (`npm install`,
  `npm test`, `npm run dev`).
- **Node.js** — the runtime that executes JavaScript/TypeScript tooling outside the browser.

## Process & platform

- **CI (Continuous Integration)** — automatically building and testing your code whenever it
  changes, so problems surface early.
- **CI/CD pipeline** — the automated workflow that builds, tests, scans (and optionally
  deploys) your app. We use **GitHub Actions**.
- **GitHub Actions** — GitHub's automation system; workflows are defined in `.github/workflows/`.
- **Repository (repo)** — the project's folder of code and docs tracked by **git**.
- **Commit** — a saved snapshot of changes, with a message describing them.
- **Pull request (PR)** — a proposed set of changes for review before merging.
- **WCAG 2.2 AA** — the Web Content Accessibility Guidelines conformance level we target. See the
  [accessibility primer](accessibility-wcag-primer.md).
- **BYOD** — Bring Your Own Device; participants use their own laptops.
