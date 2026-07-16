# Security Policy

This repository is **public** and used for a hands-on hackathon. Treat it accordingly.

## Golden rules for participants

1. **No secrets, ever.** Do not commit credentials, API keys, tokens, connection strings,
   passwords, certificates, or any `.env` file with real values. Use `.env.example` with
   placeholder values only. The [.gitignore](.gitignore) blocks common secret files, but the
   ultimate responsibility is yours.
2. **No real data.** Do not add real business data, personal information, internal
   documents, or anything sensitive. Use only the provided fixtures and sample data.
3. **Do not hit live government sites in automated tests.** Team 1's use case references the
   Australian Business Register, but tests must use the **static fixtures** provided in
   `teams/team-1-abr/fixtures/`. No scraping, no load, no live calls.
4. **Dependency hygiene.** Prefer well-maintained packages. Run `dotnet list package --vulnerable`
   and review the dependency review check before adding new packages.

## If you accidentally commit a secret

1. **Rotate/revoke the secret immediately** at its source (it must be considered compromised
   the moment it lands in git history — even if you delete it).
2. Tell a facilitator.
3. Remove it from history (`git filter-repo` or the GitHub secret-scanning remediation flow).

## Reporting a vulnerability

If you find a security issue in this repository (not in the exercises themselves), please
report it privately rather than opening a public issue.

## Supported scope

This repo is teaching material. There is no production deployment and no supported release
line. Security fixes are applied on a best-effort basis to keep the exercises safe and current.
