# E2E Testing with Playwright

This directory contains end-to-end tests for the pow3r.cashout application using Playwright.

## Test Structure

- `dashboard.spec.ts` - Tests for the main dashboard functionality
- `navigation.spec.ts` - Tests for navigation between pages
- `performance.spec.ts` - Performance and meta tag tests
- `accessibility.spec.ts` - Accessibility compliance tests

## Running Tests

### Local Development

```bash
# Run all tests
npm test

# Run tests in UI mode (interactive)
npm run test:ui

# Run tests in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```

### CI/CD

Tests run automatically on every push to `main` branch via GitHub Actions. The workflow:

1. Builds the application
2. Deploys to Cloudflare Pages
3. Runs E2E tests against the deployed URL
4. Uploads test results as artifacts

## Test Configuration

Tests are configured to run on Chrome only (as per project requirements). See `playwright.config.ts` for configuration details.

## Base URL

- **Local**: `http://localhost:5173`
- **CI/CD**: Uses the deployed Cloudflare Pages URL from the deployment step

## Writing Tests

When writing new tests:

1. Use descriptive test names
2. Follow the existing test structure
3. Use proper selectors (prefer data-testid or semantic HTML)
4. Add appropriate waits for dynamic content
5. Include assertions that verify actual functionality

## Test Reports

Test reports are automatically generated and uploaded as artifacts in CI/CD runs. You can view them in the GitHub Actions workflow results.
