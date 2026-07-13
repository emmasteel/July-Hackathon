import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Starter end-to-end + accessibility checks (Objectives C5 and stretch goal S2).
 *
 * These run against the LOCAL app only (see playwright.config.ts). Do NOT change
 * them to hit abr.business.gov.au or any live government site.
 */

test.describe('ABN lookup', () => {
  test('finds a business for a valid ABN in the sample data', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel(/australian business number/i).fill('51824753556');
    await page.getByRole('button', { name: /search/i }).click();

    // The result card should show the matching entity name.
    await expect(
      page.getByRole('heading', { name: /australian taxation office/i }),
    ).toBeVisible();
  });

  test('shows an accessible error for an invalid ABN', async ({ page }) => {
    await page.goto('/');

    await page.getByLabel(/australian business number/i).fill('123');
    await page.getByRole('button', { name: /search/i }).click();

    // The error is announced via role="alert".
    await expect(page.getByRole('alert')).toContainText(/11 digits/i);
  });

  test('has no automatically-detectable WCAG 2.2 AA violations (S2)', async ({
    page,
  }) => {
    await page.goto('/');

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  // TODO (C5): with Copilot, add a regression test for the "not found" path and
  // a keyboard-only navigation check (Tab to the field, type, Enter to submit).
});
