/**
 * Lookup of ABN details from LOCAL sample data only.
 *
 * IMPORTANT: This does NOT call the live Australian Business Register
 * (abr.business.gov.au). For the hackathon we use a small static fixture so the
 * app and tests are fast, deterministic, and safe. Replacing this with a real
 * API call (with proper validation, error handling, and rate limiting) could be
 * a follow-up beyond the event.
 */

import sampleBusinesses from '../../fixtures/abn-sample-data.json';

export interface BusinessRecord {
  readonly abn: string;
  readonly entityName: string;
  readonly entityType: string;
  readonly abnStatus: 'Active' | 'Cancelled';
  readonly state: string;
  readonly postcode: string;
  readonly gstRegistered: boolean;
}

const RECORDS: readonly BusinessRecord[] = sampleBusinesses as BusinessRecord[];

/**
 * Find a business by its normalised 11-digit ABN. Returns null when not found.
 * Assumes the ABN has already passed validateAbn().
 */
export function lookupAbn(normalisedAbn: string): BusinessRecord | null {
  return RECORDS.find((record) => record.abn === normalisedAbn) ?? null;
}
