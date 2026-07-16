[← Back to home](index.html)

# Prerequisites - complete BEFORE 22 July

This is a **bring-your-own-device (BYOD)** event. Please arrive fully set up so we can spend
the morning building, not installing. It should take **20–30 minutes**. Everything here is
copy-paste simple and works on Windows, macOS, and Linux.

If you get stuck, see [docs/copilot-setup-guide.md](docs/copilot-setup-guide.md) or send us an [email](mailto:emma.steel@microsoft.com) before the day.

---

## 1. A GitHub account with GitHub Copilot access

- [ ] You have a GitHub account and can sign in at <https://github.com>.
- [ ] GitHub Copilot is **enabled** for your account.

**Verify:** Visit <https://github.com/settings/copilot> — you should see Copilot listed as
active (via an org seat or a personal plan).

---

## 2. An IDE with the GitHub Copilot extension

> [!TIP]
> An IDE is an "integrated development environment" - a code editor with extra features (such as GitHub Copilot). See the [Glossary](docs/glossary.md) if you're new to this.

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

The starter apps use the **.NET SDK** and **git**.

- [ ] Install the **.NET 8 SDK** (LTS):
  <https://dotnet.microsoft.com/download> (the ".NET 8.0" SDK download).
- [ ] Install **git**: <https://git-scm.com/downloads>

---

## 4. Clone the repo and run the one-command verify

```bash
# Clone the hackathon repo (URL provided by the organiser)
git clone <this-repo-url>
cd github-copilot-hackathon

# Move into either team track (both verify the same way)
cd teams/team-1-abr

# Restore dependencies and run the tests
dotnet test
```

`dotnet test` restores dependencies, builds the projects, and runs the unit tests. You should
see a green **"Passed!"** summary at the end.

---

## 5. "You're ready when…" self-check

Tick all of these on your own before the event:

- [ ] I can sign in to GitHub in a browser.
- [ ] `git --version` prints a version.
- [ ] `dotnet --version` prints v8.x.x (or newer).
- [ ] VS Code opens this repo.
- [ ] The **Copilot** icon in the VS Code status bar is active (not greyed out).
- [ ] Copilot Chat opens (Ctrl/Cmd+Alt+I) and answers a test question like *"What does this
      repo do?"*.
- [ ] In a `.cs` file, typing a comment like `// function that adds two numbers` shows a grey
      Copilot suggestion I can accept with `Tab`.
- [ ] `dotnet test` printed a green **"Passed!"** summary.

If every box is ticked, you're ready. 🎉

---

## Optional but recommended

- [ ] Skim the [Accessibility / WCAG 2.2 AA primer](docs/accessibility-wcag-primer.md).
- [ ] Skim the [Glossary](docs/glossary.md) if terms like *acceptance criteria*, *CI*, or
      *e2e test* are new to you.
