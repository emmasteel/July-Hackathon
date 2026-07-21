# Coding practices in a world with AI — opening talk deck

A standalone, GitHub Pages–ready slide deck for the **first hour** of the
GitHub Copilot Hackathon (the 09:45–10:15 presentation, plus the arrival and
welcome framing). Everything from C1 onward is hands-on hacking — not covered here.

## What's in here

- `index.md` — title + clickable contents
- `01-…` to `14-…` — the slides, in order (arrival → welcome → the 30-min talk → close)
- `15-cheatsheet.md` — a take-home reference
- `_layouts/slide.html` + `assets/css/slides.css` — the retro pixel-art styling
- `assets/img/` — the PNG graphics
- `_config.yml` — Jekyll/GitHub Pages config

## Publish it

1. Copy this `presentation/` folder into a repo (its own, or alongside the hackathon repo).
2. **Settings → Pages → Deploy from a branch → main / (root or /presentation).**
3. If it's served from a subpath (e.g. `you.github.io/July-Hackathon/presentation`),
   set `baseurl` in `_config.yml` to that path so assets resolve.

GitHub Pages (Jekyll) renders each Markdown file to a page using the shared
`slide` layout. Navigate with the Back / Next buttons at the foot of every slide.

## Presenter notes

- It's built to click through like slides, but it's also browsable afterward
  as a reference — participants can come back to any slide.
- Colour coding: **Explore** = terracotta, **Create** = purple, **Survive** = green.
- Every image has alt text; no slide depends on an image to make sense.
