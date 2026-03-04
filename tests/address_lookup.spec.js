// @ts-check
const { test, expect } = require('@playwright/test');

/**
 * Test: Address Lookup – 4444 Weber Rd, 63123
 *
 * Steps:
 *   1. Navigate to the Registration Finder home page.
 *   2. Fill in Street Address and ZIP Code.
 *   3. Submit the form once.
 *   4. Verify every field on the results page matches the expected values.
 */
test('Address lookup returns correct results for 4444 Weber Rd, 63123', async ({ page }) => {

    // ── 1. Navigate ──────────────────────────────────────────────────────────
    await page.goto('/');
    await expect(page).toHaveTitle('Address Lookup');

    // ── 2. Fill the form ─────────────────────────────────────────────────────
    await page.locator('#streetAddress').fill('4444 Weber Rd');
    await page.locator('#ZIPCode').fill('63123');

    // ── 3. Submit once ───────────────────────────────────────────────────────
    await page.getByRole('button', { name: 'Submit' }).click();

    // Wait for the results page to appear
    await page.waitForURL(/lookup/i, { timeout: 30_000 });

    // ── 4. Page heading ───────────────────────────────────────────────────────
    await expect(page.getByRole('heading', { name: 'Address Lookup Results' }))
        .toBeVisible();

    // ── 5. Input section ──────────────────────────────────────────────────────
    // Use exact: true to avoid matching the longer "Returned Address" string
    await expect(page.getByText('4444 Weber Rd', { exact: true })).toBeVisible();
    await expect(page.getByText('63123', { exact: true })).toBeVisible();

    // ── 6. Results section ────────────────────────────────────────────────────
    await expect(page.getByText('4444 WEBER RD, SAINT LOUIS, MO, 63123', { exact: true })).toBeVisible();

    // Scope "St Louis County" to the Geographic Code row by its label
    await expect(
        page.getByText('Geographic Code:').locator('..').getByText('St Louis County', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Patron Type:').locator('..').getByText('Resident', { exact: true })
    ).toBeVisible();

    // ── 7. Details section ────────────────────────────────────────────────────
    await expect(
        page.getByText('County:').locator('..').getByText('St. Louis County', { exact: true })
    ).toBeVisible();

    await expect(
        page.getByText('Library District:').locator('..').getByText('St. Louis County', { exact: true })
    ).toBeVisible();

    // ── 8. Back to Search button/link ─────────────────────────────────────────
    await expect(
        page.getByRole('link', { name: /back to search/i })
            .or(page.getByRole('button', { name: /back to search/i }))
    ).toBeVisible();
});
