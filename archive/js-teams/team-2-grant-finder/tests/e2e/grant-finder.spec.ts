import { test, expect } from '@playwright/test';

/**
 * Starter end-to-end + accessibility checks (Objectives C5 and stretch goal S2).
 *
 * Accessibility is verified with plain Playwright assertions (accessible names,
 * semantic roles, keyboard operability) plus Copilot-assisted review — no
 * third-party scanner.
 *
 * These run against the LOCAL app only (see playwright.config.ts). Do NOT change
 * them to hit business.gov.au or any live government site.
 */

test.describe('Grant finder', () => {
  test('shows matching grants with explanations for a valid profile', async ({
    page,
  }) => {
    await page.goto('/');

    await page.getByLabel(/state or territory/i).selectOption('VIC');
    await page.getByLabel(/industry/i).selectOption('Manufacturing');
    await page.getByLabel(/number of employees/i).fill('15');
    await page.getByLabel(/annual turnover/i).fill('1000000');
    await page.getByLabel(/years trading/i).fill('3');
    await page.getByRole('button', { name: /find grants/i }).click();

    // At least one grant should match and explain why.
    await expect(page.getByText(/why it matches/i).first()).toBeVisible();
  });

  test('shows an accessible error summary for an empty form', async ({
    page,
  }) => {
    await page.goto('/');
    await page.getByRole('button', { name: /find grants/i }).click();

    await expect(page.getByRole('alert')).toContainText(/please fix/i);
  });

  test('form controls are accessible and keyboard-operable (S2)', async ({
    page,
  }) => {
    await page.goto('/');

    // Every control is reached by its visible <label> (not placeholder-only).
    await expect(page.getByLabel(/state or territory/i)).toBeVisible();
    await expect(page.getByLabel(/industry/i)).toBeVisible();
    await expect(page.getByLabel(/number of employees/i)).toBeVisible();
    await expect(page.getByLabel(/annual turnover/i)).toBeVisible();
    await expect(page.getByLabel(/years trading/i)).toBeVisible();

    // The submit control is a real button with an accessible name.
    await expect(
      page.getByRole('button', { name: /find grants/i }),
    ).toBeVisible();

    // Keyboard-only: the first control can be focused directly.
    const firstField = page.getByLabel(/state or territory/i);
    await firstField.focus();
    await expect(firstField).toBeFocused();
  });

  // TODO (C5): with Copilot, add a regression test for a profile that matches NO
  // grants, and a keyboard-only walkthrough of the whole form.
});
