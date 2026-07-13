import { describe, it, expect } from 'vitest';
import {
  validateProfile,
  checkGrant,
  findGrants,
  type BusinessProfile,
  type Grant,
} from '../src/lib/eligibility';

/**
 * Starter unit tests for grant eligibility.
 *
 * These give you a working baseline. During the hackathon (Objective C4), use
 * Copilot + the `generate-unit-tests` prompt to ADD edge cases and to
 * critique/strengthen these. Look for the TODOs.
 */

const validProfile: BusinessProfile = {
  state: 'VIC',
  industry: 'Manufacturing',
  employees: 15,
  annualTurnover: 1_000_000,
  yearsTrading: 3,
};

describe('validateProfile', () => {
  it('accepts a complete, valid profile', () => {
    expect(validateProfile(validProfile).valid).toBe(true);
  });

  it('rejects a missing state', () => {
    const result = validateProfile({ ...validProfile, state: undefined });
    expect(result.valid).toBe(false);
    expect(result.errors.state).toBeDefined();
  });

  it('rejects a negative number of employees', () => {
    const result = validateProfile({ ...validProfile, employees: -1 });
    expect(result.valid).toBe(false);
    expect(result.errors.employees).toBeDefined();
  });

  it('rejects a non-numeric turnover (untrusted boundary)', () => {
    const result = validateProfile({
      ...validProfile,
      annualTurnover: Number.NaN,
    });
    expect(result.valid).toBe(false);
  });

  // TODO (C4): with Copilot, add tests for turnover = 0 (should be valid) and
  // an unknown industry string.
});

describe('checkGrant', () => {
  const regionalManufacturing: Grant = {
    id: 'regional-manufacturing',
    name: 'Regional Manufacturing Growth Fund',
    description: 'test',
    amount: 50000,
    eligibleStates: ['VIC', 'TAS', 'SA', 'NT'],
    eligibleIndustries: ['Manufacturing'],
    maxEmployees: 200,
  };

  it('marks a matching profile eligible and explains why', () => {
    const result = checkGrant(regionalManufacturing, validProfile);
    expect(result.eligible).toBe(true);
    expect(result.reasonsFor.length).toBeGreaterThan(0);
    expect(result.reasonsAgainst).toHaveLength(0);
  });

  it('marks an out-of-state profile ineligible with a reason', () => {
    const result = checkGrant(regionalManufacturing, {
      ...validProfile,
      state: 'NSW',
    });
    expect(result.eligible).toBe(false);
    expect(result.reasonsAgainst.join(' ')).toMatch(/only available/i);
  });

  // TODO (C4): with Copilot, add a boundary test where employees EQUALS
  // maxEmployees (should still be eligible).
});

describe('findGrants', () => {
  it('returns all grants, eligible ones first', () => {
    const results = findGrants(validProfile);
    expect(results.length).toBeGreaterThan(0);
    const firstIneligibleIndex = results.findIndex((r) => !r.eligible);
    if (firstIneligibleIndex !== -1) {
      // No eligible grant should appear after an ineligible one.
      const afterFirstIneligible = results.slice(firstIneligibleIndex);
      expect(afterFirstIneligible.every((r) => !r.eligible)).toBe(true);
    }
  });
});
