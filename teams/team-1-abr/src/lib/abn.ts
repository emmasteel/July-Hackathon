/**
 * ABN (Australian Business Number) validation.
 *
 * Pure logic — no UI, no network. Unit-tested in tests/abn.test.ts.
 *
 * An ABN is 11 digits and is validated with the ATO checksum algorithm:
 *   1. Subtract 1 from the FIRST (leftmost) digit.
 *   2. Multiply each of the 11 digits by its weight: [10,1,3,5,7,9,11,13,15,17,19].
 *   3. Sum the results.
 *   4. The ABN is valid if the sum is divisible by 89.
 *
 * Security note: input is treated as untrusted. We validate type, strip only
 * formatting whitespace, and reject anything that is not exactly 11 digits
 * BEFORE running the checksum.
 */

/** Positional weights defined by the ATO ABN checksum algorithm. */
const ABN_WEIGHTS = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19] as const;

/** Result of validating an ABN. */
export interface AbnValidationResult {
  readonly valid: boolean;
  /** A short, user-safe reason when invalid. Empty string when valid. */
  readonly reason: string;
  /** The normalised 11-digit ABN (spaces removed) when the format is right. */
  readonly normalised: string;
}

/**
 * Remove spaces from a candidate ABN so "51 824 753 556" and "51824753556"
 * are treated the same. Does not remove other characters — non-digits are
 * rejected by validation so we surface a clear error instead of silently
 * "fixing" bad input.
 */
export function normaliseAbn(input: string): string {
  return input.replace(/\s+/g, '');
}

/**
 * Validate an ABN string. Returns a structured result rather than throwing,
 * so the UI can show an accessible, specific error message.
 */
export function validateAbn(input: unknown): AbnValidationResult {
  // Boundary validation: never trust the input type.
  if (typeof input !== 'string') {
    return { valid: false, reason: 'ABN must be text.', normalised: '' };
  }

  const normalised = normaliseAbn(input);

  if (normalised.length === 0) {
    return { valid: false, reason: 'Enter an ABN.', normalised: '' };
  }

  if (!/^\d+$/.test(normalised)) {
    return {
      valid: false,
      reason: 'An ABN must contain digits only.',
      normalised,
    };
  }

  if (normalised.length !== 11) {
    return {
      valid: false,
      reason: 'An ABN must be exactly 11 digits.',
      normalised,
    };
  }

  const digits = normalised.split('').map((d) => Number.parseInt(d, 10));

  // Step 1: subtract 1 from the first digit.
  const weighted = digits.map((digit, index) => {
    const value = index === 0 ? digit - 1 : digit;
    return value * ABN_WEIGHTS[index];
  });

  const sum = weighted.reduce((total, value) => total + value, 0);

  if (sum % 89 !== 0) {
    return {
      valid: false,
      reason: 'That ABN failed the checksum. Please double-check the number.',
      normalised,
    };
  }

  return { valid: true, reason: '', normalised };
}

/** Format an 11-digit ABN for display as "NN NNN NNN NNN". */
export function formatAbn(normalised: string): string {
  if (normalised.length !== 11) {
    return normalised;
  }
  return `${normalised.slice(0, 2)} ${normalised.slice(2, 5)} ${normalised.slice(
    5,
    8,
  )} ${normalised.slice(8, 11)}`;
}
