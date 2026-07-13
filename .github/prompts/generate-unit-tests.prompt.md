---
mode: agent
description: Generate, review, and strengthen unit tests for a piece of logic.
---

# Generate unit tests

You are helping strengthen the test suite for pure logic in `src/lib/`. We use **Vitest**.

## Task
For the function or module I point you at:

1. Identify its **behaviours and inputs** (happy path, edge cases, error conditions).
2. Generate Vitest unit tests that cover:
   - the happy path,
   - **edge cases**: empty/blank input, wrong type/length, boundary values, malformed input,
   - **error conditions**: what should throw or return an error result.
3. Use clear, behaviour-named tests: `it('rejects an ABN with an invalid checksum', ...)`.
4. After generating, **review your own tests** and list:
   - any behaviour still untested,
   - any test that is weak (asserts too little) and how to strengthen it.

## Rules
- Do not change the implementation to make tests pass — if you think there's a bug, call it
  out instead.
- Keep tests deterministic; no network, no live sites, no time-dependent flakiness.
- Prefer table-driven tests (`it.each`) where inputs vary but logic is the same.
- Output test code plus a short "coverage gaps" list at the end.
