import { describe, it, expect } from 'vitest';
import { validateAbn, normaliseAbn, formatAbn } from '../src/lib/abn';

/**
 * Starter unit tests for ABN validation.
 *
 * These give you a working baseline. During the hackathon (Objective C4), use
 * Copilot + the `generate-unit-tests` prompt to ADD more edge cases and to
 * critique/strengthen these. Look for the TODOs.
 */

describe('validateAbn', () => {
  it('accepts a valid ABN (ATO, 51 824 753 556)', () => {
    const result = validateAbn('51824753556');
    expect(result.valid).toBe(true);
    expect(result.normalised).toBe('51824753556');
  });

  it('accepts a valid ABN that contains spaces', () => {
    const result = validateAbn('51 824 753 556');
    expect(result.valid).toBe(true);
  });

  it('rejects an empty string', () => {
    const result = validateAbn('');
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/enter an abn/i);
  });

  it('rejects an ABN that is not 11 digits', () => {
    const result = validateAbn('123');
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/11 digits/i);
  });

  it('rejects an ABN containing letters', () => {
    const result = validateAbn('5182475355A');
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/digits only/i);
  });

  it('rejects an 11-digit number that fails the checksum', () => {
    // Valid ABN with its last digit changed → checksum should fail.
    const result = validateAbn('51824753557');
    expect(result.valid).toBe(false);
    expect(result.reason).toMatch(/checksum/i);
  });

  it('rejects non-string input (untrusted boundary)', () => {
    // validateAbn accepts `unknown` and validates the type itself.
    const result = validateAbn(51824753556 as unknown);
    expect(result.valid).toBe(false);
  });

  // TODO (C4): with Copilot, add tests for:
  //  - an ABN padded with leading/trailing spaces only
  //  - the boundary case of exactly 10 and exactly 12 digits
  //  - at least one MORE known-valid ABN from the fixtures
});

describe('normaliseAbn', () => {
  it('removes all whitespace', () => {
    expect(normaliseAbn('  51 824 753 556 ')).toBe('51824753556');
  });
});

describe('formatAbn', () => {
  it('formats an 11-digit ABN as NN NNN NNN NNN', () => {
    expect(formatAbn('51824753556')).toBe('51 824 753 556');
  });

  it('returns the input unchanged when not 11 digits', () => {
    expect(formatAbn('123')).toBe('123');
  });
});
