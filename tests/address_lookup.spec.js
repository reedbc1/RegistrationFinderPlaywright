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
    const valueFor = (section, label) =>
        section.locator('p').filter({ hasText: label }).locator('.value');

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
    await expect(page).toHaveTitle('Address Lookup Results');
    await expect(page.getByRole('heading', { name: 'Address Lookup Results' }))
        .toBeVisible();

    // ── 5. Input section ──────────────────────────────────────────────────────
    const inputSection = page.locator('.input-section');
    await expect(inputSection.getByRole('heading', { name: 'Input:' })).toBeVisible();
    await expect(valueFor(inputSection, 'Street Address:')).toHaveText('4444 Weber Rd');
    await expect(valueFor(inputSection, 'ZIP Code:')).toHaveText('63123');

    // ── 6. Results section ────────────────────────────────────────────────────
    const resultSection = page.locator('.result-section');
    await expect(resultSection.getByRole('heading', { name: 'Results:' })).toBeVisible();
    await expect(valueFor(resultSection, 'Returned Address:')).toHaveText('4444 WEBER RD, ST LOUIS, MO 63123');
    await expect(valueFor(resultSection, 'Geographic Code:')).toHaveText('St Louis County');
    await expect(valueFor(resultSection, 'Patron Code:')).toHaveText('Resident');

    // ── 7. Details section ────────────────────────────────────────────────────
    const detailSection = page.locator('.detail-section');
    await expect(detailSection.getByRole('heading', { name: 'Details:' })).toBeVisible();
    await expect(valueFor(detailSection, 'County:')).toHaveText('St. Louis County');
    await expect(valueFor(detailSection, 'Library District:')).toHaveText('St. Louis County');

    // ── 8. Footer navigation and attribution ──────────────────────────────────
    const footer = page.locator('.container-footer');
    await expect(footer.getByRole('link', { name: /back to search/i })).toHaveAttribute('href', '/');
    await expect(footer).toContainText('Powered by');
    await expect(footer.getByRole('link', { name: 'Esri' })).toHaveAttribute('href', 'https://www.esri.com/en-us/home');
});
