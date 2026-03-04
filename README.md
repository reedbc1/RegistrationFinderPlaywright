# RegistrationFinderPlaywright

Playwright end-to-end tests for the [Registration Finder](https://registrationfinder.onrender.com/) address lookup web application.

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm (bundled with Node.js)

---

## Installation

Install dependencies and the Playwright browser binaries:

```bash
npm install
npx playwright install chromium
```

---

## Running the Tests

```bash
npx playwright test
```

Results are printed to the console. On failure, a screenshot and video are automatically saved to the `test-results/` directory.

---

## Test Case: Address Lookup – 4444 Weber Rd, 63123

**File:** `tests/address_lookup.spec.js`

This test verifies that submitting a known address returns the correct registration and library district information.

### Steps

1. **Navigate to the home page**
   Opens `https://registrationfinder.onrender.com/` and asserts the page title is `"Address Lookup"`.

2. **Fill in the form**
   Enters the following values into the lookup form:
   - **Street Address:** `4444 Weber Rd`
   - **ZIP Code:** `63123`

3. **Submit the form (once)**
   Clicks the `Submit` button to trigger the address lookup.

4. **Wait for the results page**
   Waits for the URL to change to the `/lookup` results page before proceeding with assertions.

5. **Assert the page heading**
   Verifies that the heading `"Address Lookup Results"` is visible on the page.

6. **Assert the Input section**
   Confirms the form echo displays the original inputs exactly:
   - Street Address: `4444 Weber Rd`
   - ZIP Code: `63123`

7. **Assert the Results section**
   Verifies the lookup returned the correct data:
   - **Returned Address:** `4444 WEBER RD, SAINT LOUIS, MO, 63123`
   - **Geographic Code:** `St Louis County`
   - **Patron Type:** `Resident`

8. **Assert the Details section**
   Verifies the library district details are correct:
   - **County:** `St. Louis County`
   - **Library District:** `St. Louis County`

9. **Assert the Back to Search button**
   Confirms the `← Back to Search` navigation element is visible on the results page.

### Pass / Fail Criteria

The test **passes** if every assertion in steps 5–9 succeeds.
The test **fails** if any single assertion does not match the expected value.
