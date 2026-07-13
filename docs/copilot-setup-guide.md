[← Back to home](../index.html)

# Copilot setup guide

A step-by-step guide to getting GitHub Copilot working in your IDE and verifying it. If you
completed [PREREQUISITES.md](../PREREQUISITES.md) you're mostly done — this adds detail and
troubleshooting.

---

## VS Code (recommended — all demos use this)

### 1. Install VS Code and the Copilot extension
1. Install VS Code: <https://code.visualstudio.com>.
2. Open the Extensions view (`Ctrl/Cmd+Shift+X`).
3. Search **GitHub Copilot** and install it. This also installs **GitHub Copilot Chat**.

### 2. Sign in
1. Click the **Accounts** icon (bottom-left) → **Sign in with GitHub to use Copilot**.
2. Complete the browser auth flow and return to VS Code.
3. If your Copilot access comes from your organisation's GitHub org, you may be prompted for SSO — approve it.

### 3. Verify it works
- **Status bar:** the Copilot icon (bottom-right) should be solid, not greyed out or showing an
  error.
- **Inline completion:** create a file `scratch.ts`, type:
  ```ts
  // function that returns the sum of two numbers
  ```
  Press Enter and wait — grey "ghost text" should appear. Press `Tab` to accept.
- **Chat:** open Copilot Chat (`Ctrl/Cmd+Alt+I`) and ask *"What does this repo do?"*. With this
  repo open, it should reference the hackathon and `copilot-instructions.md`.

### 4. Useful Copilot features for today
- **Inline suggestions:** `Tab` accept, `Esc` dismiss, `Alt+]` / `Alt+[` cycle.
- **Chat slash commands:** `/explain`, `/fix`, `/tests` on selected code.
- **Prompt files:** run the reusable prompts in `.github/prompts/` from Chat.
- **@workspace** in chat to ask questions across the whole repo.

---

## JetBrains IDEs (IntelliJ, WebStorm, Rider, PyCharm) — alternative

1. **Settings → Plugins → Marketplace**, search **GitHub Copilot**, install, restart.
2. **Tools → GitHub Copilot → Login to GitHub**, complete the device-code flow.
3. Verify: type a comment describing a function and wait for a grey suggestion; press `Tab`.
4. Copilot Chat is available in the right-hand tool window.

---

## Visual Studio 2022 (17.10+) — alternative

1. Copilot is included. Ensure you're on a recent 17.10+ build (**Help → Check for Updates**).
2. Sign in via the account menu (top-right) with a GitHub account that has Copilot.
3. Verify with inline suggestions and the Copilot Chat window.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Copilot icon greyed out | You're not signed in, or no seat assigned. Sign in via Accounts; if org-managed, confirm your admin assigned a seat. |
| "No access to Copilot" | Access path not set up — see the licensing TODO in [PREREQUISITES.md](../PREREQUISITES.md); talk to the organiser. |
| No suggestions appear | Check the language isn't disabled (Settings → search "Copilot Enable"); reload window; check the Output panel → "GitHub Copilot". |
| Works at home, not at the office | Corporate proxy/firewall may block Copilot endpoints. Use the guest Wi-Fi / phone hotspot fallback for the event. |
| SSO loop | Authorise your organisation's GitHub org for your token in the browser prompt, then retry sign-in. |
| Chat doesn't see repo context | Make sure you opened the **folder** (not a single file) and this repo's `copilot-instructions.md` is present. |

Still stuck? Grab a facilitator during the 09:00–09:30 setup window — that time exists exactly
for this.
