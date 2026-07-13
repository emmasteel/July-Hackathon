# Legacy modernisation sample (Stretch goal S5)

A small, deliberately dated snippet for the **legacy modernisation** stretch goal. It nods to
the real-world goal of cleaning up legacy macros/scripts. Your job: use Copilot to refactor
it into clean, typed, tested, behaviour-preserving code — **without changing what it does**.

## The scenario

[`legacy-abn-report.js`](legacy-abn-report.js) is an old-style script that takes a list of
business records and produces a summary report string. It works, but it's hard to read, untyped,
mutation-heavy, and has no tests. It's the kind of thing that accumulates in a department over
years.

## Your task

1. **Understand it first.** Ask Copilot (`/explain`) what the code does. Confirm the current
   behaviour — this is your safety net.
2. **Characterisation test.** Before refactoring, write a test that captures the CURRENT output
   for a sample input (Copilot can help). This proves your refactor preserves behaviour.
3. **Refactor with Copilot.** Aim for:
   - TypeScript with explicit types,
   - small pure functions instead of one long mutating loop,
   - clear names, no magic numbers,
   - the same output for the same input.
4. **Prove it.** Your characterisation test must still pass. Add a couple more edge-case tests.
5. **Write it up.** In your team's docs (S4), note what Copilot changed and what you had to
   correct — Copilot sometimes "helpfully" changes behaviour; catching that is the point.

## Definition of done

See [../../OBJECTIVES.md](../../OBJECTIVES.md) → **S5**. In short: cleaner, typed, tested,
behaviour-preserving code, plus a short note on the Copilot experience.

## How to run (quick)

This sample is intentionally standalone (plain Node, no build):

```bash
node samples/legacy-snippet/legacy-abn-report.js
```

> Tip: you can drop your refactored version next to the original and diff the outputs to prove
> they match.
