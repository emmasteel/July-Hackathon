[← Back to home](index.html)

# Prerequisites — complete BEFORE 22 July

This is a **bring-your-own-device (BYOD)** event. Please arrive fully set up so we can spend
the morning building, not installing. It should take **20–30 minutes**. Everything here is
copy-paste simple and works on Windows, macOS, and Linux.

If you get stuck, see [docs/copilot-setup-guide.md](docs/copilot-setup-guide.md) or ask in
〔**TODO: add support channel — Teams channel / email / Slack**〕 before the day.

---

## 1. A GitHub account with GitHub Copilot access

- [ ] You have a GitHub account and can sign in at <https://github.com>.
- [ ] GitHub Copilot is **enabled** for your account.

> 〔**TODO — organiser:** confirm how participants get Copilot access. Options:
> **(a)** organisation Copilot Business/Enterprise seats assigned in advance (preferred — no
> personal billing), **(b)** participants use **Copilot Free** (limited monthly completions/
> chat), or **(c)** an existing individual subscription. Communicate the chosen path and any
> org/SSO steps to participants at least a week out.〕

**Verify:** Visit <https://github.com/settings/copilot> — you should see Copilot listed as
active (via an org seat or a personal plan).

---

## 2. An IDE with the GitHub Copilot extension

**Visual Studio Code is recommended** and all facilitator demos use it.

- [ ] Install **VS Code**: <https://code.visualstudio.com>
- [ ] Install the **GitHub Copilot** extension (includes Copilot Chat):
  <https://marketplace.visualstudio.com/items?itemName=GitHub.copilot>
- [ ] Sign in to Copilot inside VS Code (see the setup guide).

**Alternatives (supported, but demos are in VS Code):**
- **JetBrains IDEs** (IntelliJ, WebStorm, Rider, PyCharm) — install the *GitHub Copilot*
  plugin from the Marketplace.
- **Visual Studio 2022** (17.10+) — Copilot is built in; sign in via the account menu.

---

## 3. Runtime + git for the default stack

The starter apps use **Node.js** and **git**.

- [ ] Install **Node.js LTS** 〔**TODO: confirm — Node 20 LTS or Node 22 LTS**〕:
  <https://nodejs.org> (the "LTS" download).
- [ ] Install **git**: <https://git-scm.com/downloads>

> If your team confirms a different stack (.NET / Python / Power Platform), this section will be
> updated. See the stack note in the [README](README.md).

---

## 4. Clone the repo and run the one-command verify

```bash
# Clone the hackathon repo (URL provided by the organiser)
git clone <this-repo-url>
cd github-copilot-hackathon

# Move into either team track (both verify the same way)
cd teams/team-1-abr

# Install dependencies and run the built-in check
npm install
npm run verify
```

`npm run verify` prints your Node version, confirms dependencies installed, and runs the
placeholder unit tests. You should see a green **"✅ Environment looks good"** line at the end.

---

## 5. "You're ready when…" self-check

Tick all of these on your own before the event:

- [ ] I can sign in to GitHub in a browser.
- [ ] `git --version` prints a version.
- [ ] `node --version` prints v〔20 or 22〕.x.x.
- [ ] VS Code opens this repo.
- [ ] The **Copilot** icon in the VS Code status bar is active (not greyed out).
- [ ] Copilot Chat opens (Ctrl/Cmd+Alt+I) and answers a test question like *"What does this
      repo do?"*.
- [ ] In a `.ts` file, typing a comment like `// function that adds two numbers` shows a grey
      Copilot suggestion I can accept with `Tab`.
- [ ] `npm run verify` printed **"✅ Environment looks good"**.

If every box is ticked, you're ready. 🎉

---

## Optional but recommended

- [ ] Install the **axe Accessibility Linter** VS Code extension (helps with stretch goal S2).
- [ ] Skim the [Accessibility / WCAG 2.2 AA primer](docs/accessibility-wcag-primer.md).
- [ ] Skim the [Glossary](docs/glossary.md) if terms like *acceptance criteria*, *CI*, or
      *e2e test* are new to you.
