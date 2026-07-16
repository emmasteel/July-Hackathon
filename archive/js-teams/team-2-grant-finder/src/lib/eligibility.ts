/**
 * Grant eligibility logic.
 *
 * Pure logic — no UI, no network. Unit-tested in tests/eligibility.test.ts.
 *
 * Design principle for this feature: a match must ALWAYS explain WHY it matched
 * (or why it did not). Eligibility for public funding must be transparent, so
 * every result carries human-readable reasons.
 *
 * Security note: the business profile comes from user input and is treated as
 * untrusted. We validate it at the boundary (see validateProfile) before any
 * eligibility logic runs.
 */

import grantsData from '../../fixtures/grants-sample-data.json';

export type State =
  | 'NSW'
  | 'VIC'
  | 'QLD'
  | 'SA'
  | 'WA'
  | 'TAS'
  | 'NT'
  | 'ACT';

export const STATES: readonly State[] = [
  'NSW',
  'VIC',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'NT',
  'ACT',
];

export const INDUSTRIES = [
  'Agriculture',
  'Manufacturing',
  'Technology',
  'Retail',
  'Health',
  'Tourism',
] as const;

export type Industry = (typeof INDUSTRIES)[number];

/** The business profile a user enters to check eligibility. */
export interface BusinessProfile {
  readonly state: State;
  readonly industry: Industry;
  /** Number of employees (>= 0). */
  readonly employees: number;
  /** Annual turnover in AUD (>= 0). */
  readonly annualTurnover: number;
  /** Years the business has been operating (>= 0). */
  readonly yearsTrading: number;
}

/** Eligibility rules for a grant. Missing fields mean "no restriction". */
export interface Grant {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly amount: number;
  readonly eligibleStates?: readonly State[];
  readonly eligibleIndustries?: readonly Industry[];
  readonly maxEmployees?: number;
  readonly maxTurnover?: number;
  readonly minYearsTrading?: number;
}

export const GRANTS: readonly Grant[] = grantsData as Grant[];

export interface EligibilityResult {
  readonly grant: Grant;
  readonly eligible: boolean;
  /** Human-readable reasons the grant matched. */
  readonly reasonsFor: readonly string[];
  /** Human-readable reasons the grant did NOT match. */
  readonly reasonsAgainst: readonly string[];
}

export interface ProfileValidationResult {
  readonly valid: boolean;
  /** Field name → error message. Empty when valid. */
  readonly errors: Readonly<Record<string, string>>;
}

/**
 * Validate a business profile at the boundary. Returns per-field errors so the
 * UI can show accessible, specific messages next to each field.
 */
export function validateProfile(
  profile: Partial<BusinessProfile>,
): ProfileValidationResult {
  const errors: Record<string, string> = {};

  if (!profile.state || !STATES.includes(profile.state)) {
    errors.state = 'Select a state or territory.';
  }
  if (
    !profile.industry ||
    !INDUSTRIES.includes(profile.industry as Industry)
  ) {
    errors.industry = 'Select an industry.';
  }

  const numericFields: Array<[keyof BusinessProfile, string]> = [
    ['employees', 'Enter the number of employees (0 or more).'],
    ['annualTurnover', 'Enter your annual turnover in dollars (0 or more).'],
    ['yearsTrading', 'Enter how many years you have been trading (0 or more).'],
  ];

  for (const [field, message] of numericFields) {
    const value = profile[field];
    if (typeof value !== 'number' || Number.isNaN(value) || value < 0) {
      errors[field] = message;
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

/**
 * Check a single grant against a validated profile, returning the match plus
 * the reasons for/against. Assumes the profile has passed validateProfile().
 */
export function checkGrant(
  grant: Grant,
  profile: BusinessProfile,
): EligibilityResult {
  const reasonsFor: string[] = [];
  const reasonsAgainst: string[] = [];

  if (grant.eligibleStates) {
    if (grant.eligibleStates.includes(profile.state)) {
      reasonsFor.push(`Available in ${profile.state}.`);
    } else {
      reasonsAgainst.push(
        `Only available in ${grant.eligibleStates.join(', ')}.`,
      );
    }
  }

  if (grant.eligibleIndustries) {
    if (grant.eligibleIndustries.includes(profile.industry)) {
      reasonsFor.push(`Open to the ${profile.industry} industry.`);
    } else {
      reasonsAgainst.push(
        `Only for: ${grant.eligibleIndustries.join(', ')}.`,
      );
    }
  }

  if (typeof grant.maxEmployees === 'number') {
    if (profile.employees <= grant.maxEmployees) {
      reasonsFor.push(`Within the ${grant.maxEmployees}-employee limit.`);
    } else {
      reasonsAgainst.push(
        `Limited to ${grant.maxEmployees} employees or fewer.`,
      );
    }
  }

  if (typeof grant.maxTurnover === 'number') {
    if (profile.annualTurnover <= grant.maxTurnover) {
      reasonsFor.push(
        `Turnover is within the $${grant.maxTurnover.toLocaleString('en-AU')} cap.`,
      );
    } else {
      reasonsAgainst.push(
        `Turnover must be $${grant.maxTurnover.toLocaleString('en-AU')} or less.`,
      );
    }
  }

  if (typeof grant.minYearsTrading === 'number') {
    if (profile.yearsTrading >= grant.minYearsTrading) {
      reasonsFor.push(
        `Meets the ${grant.minYearsTrading}+ years trading requirement.`,
      );
    } else {
      reasonsAgainst.push(
        `Must have traded for at least ${grant.minYearsTrading} years.`,
      );
    }
  }

  return {
    grant,
    eligible: reasonsAgainst.length === 0,
    reasonsFor,
    reasonsAgainst,
  };
}

/**
 * Evaluate all grants for a profile. Returns eligible grants first, each with
 * its explanation.
 */
export function findGrants(profile: BusinessProfile): EligibilityResult[] {
  return GRANTS.map((grant) => checkGrant(grant, profile)).sort(
    (a, b) => Number(b.eligible) - Number(a.eligible),
  );
}
