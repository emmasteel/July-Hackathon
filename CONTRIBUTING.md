# Contributing

Thanks for your interest! This repository powers the **GitHub Copilot Hackathon**. How
you contribute depends on whether you're a **participant** or an **organiser/maintainer**.

## For hackathon participants (during the event)

You don't need to open pull requests against this repo unless the organiser sets it up that
way. Typically you'll:

1. **Clone** (or fork, if the organiser asks) this repo.
2. Work inside **your team's track** — `teams/team-1-abr/` or `teams/team-2-grant-finder/`.
3. Commit locally and often. Use clear commit messages (see below).
4. Keep the [Code of Conduct](CODE_OF_CONDUCT.md) and [SECURITY.md](SECURITY.md) rules in mind
   — **no secrets, no real data, no live-site scraping in tests**.


## Commit message style

Use short, imperative summaries. Conventional-commit prefixes are welcome but not required:

```
feat(abr): add ABN format validation
test(abr): cover invalid-checksum edge case
docs: add ADR for choosing client-side validation
fix(a11y): add visible focus outline to lookup button
```

## For organisers / maintainers

- Populate every 〔bracketed〕 TODO before sharing widely (see the "Organiser TODO" list the
  scaffolding produced, and search the repo for `〔` / `TODO`).
- Keep starter apps runnable: `npm install && npm run verify` must pass in each team track.
- Prefer editing existing files over adding new ones; keep the structure in the
  [README](README.md) map accurate.
- Don't introduce secrets or environment-specific config. Use `.env.example` placeholders.

## Reporting issues with the materials

Open a GitHub issue using the provided template, or contact the facilitator (Emma Steel —
emma.steel@microsoft.com).

## Licence

By contributing, you agree that your contributions are licensed under the
[MIT Licence](LICENSE).
