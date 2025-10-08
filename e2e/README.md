# E2E Tests - pow3r.cashout

## Test Structure (Best Practices)

### Test Files
1. **01-visual-rendering.spec.ts** - Critical CSS/styling validation
2. **02-dashboard-functionality.spec.ts** - Dashboard features
3. **03-component-library.spec.ts** - Component library tests
4. **04-css-validation.spec.ts** - Tailwind CSS compilation checks
5. **05-visual-regression.spec.ts** - Screenshot baselines

### Test Approach

**Best Practices Implemented:**
- ✅ Screenshots for every critical test
- ✅ Visual validation (not just DOM checks)
- ✅ Computed styles verification
- ✅ CSS compilation validation
- ✅ Responsive testing with screenshots
- ✅ Proper wait strategies
- ✅ Organized by feature/concern
- ✅ Clear, descriptive test names

---

## Running Tests

### Against Production (Cloudflare)
```bash
BASE_URL=https://15682f50.pow3r-cashout.pages.dev npm run test:e2e
```

### Against Local Dev
```bash
npm run dev
# In another terminal:
npm run test:e2e
```

### View Test Report
```bash
npx playwright show-report
```

---

## Screenshot Directory

All screenshots are saved to:
```
test-results/screenshots/
├── 01-dashboard-initial.png
├── 02-css-loaded.png
├── 03-dark-mode.png
├── 04-card-borders.png
├── 05-typography.png
├── 06-grid-layout.png
├── 07-charts-rendered.png
├── baseline-dashboard-desktop.png
├── baseline-dashboard-mobile.png
├── baseline-library.png
├── widget-*.png
└── ... (and more)
```

---

## Critical Tests

### CSS Compilation Test
**File**: `04-css-validation.spec.ts`

This test ensures that:
- Tailwind CSS is properly compiled
- No raw `@tailwind` directives in production CSS
- Styles are actually applied to elements
- Background and text colors are set

**This is the most important test** - if it fails, the app has no styling.

---

## Visual Validation

Unlike the old tests, these new tests:
- ✅ Take screenshots for manual verification
- ✅ Check computed styles (not just DOM)
- ✅ Validate colors are applied
- ✅ Verify layout properties (grid, flexbox)
- ✅ Ensure fonts are sized correctly
- ✅ Confirm borders are visible

---

## Test Organization

### By Priority
1. **Critical**: CSS validation (must pass)
2. **High**: Visual rendering (styling applied)
3. **Medium**: Functionality (features work)
4. **Low**: Visual regression (baseline captures)

### By Feature
- Dashboard widgets
- Component library
- Responsive layouts
- Theme system
- Charts rendering

---

## Best Practices Used

1. **Screenshot Every Test** - Visual proof of state
2. **Verify Computed Styles** - Not just DOM existence
3. **Wait Strategies** - Proper networkidle + timeouts for charts
4. **Explicit Assertions** - Check actual values, not just truthy
5. **Organized Structure** - Clear file naming and grouping
6. **Failure Artifacts** - Screenshots + videos on failure
7. **Full-Page Screenshots** - Capture entire visual state

---

## Running Specific Tests

```bash
# Run only CSS validation
BASE_URL=https://15682f50.pow3r-cashout.pages.dev npx playwright test 04-css

# Run only visual tests
BASE_URL=https://15682f50.pow3r-cashout.pages.dev npx playwright test 01-visual

# Run with headed browser (see what's happening)
BASE_URL=https://15682f50.pow3r-cashout.pages.dev npx playwright test --headed

# Debug mode
BASE_URL=https://15682f50.pow3r-cashout.pages.dev npx playwright test --debug
```

---

## Test Expectations

### What Tests Validate

**Visual Elements:**
- Background colors applied
- Text is readable
- Borders are visible
- Layouts are structured (grid/flex)
- Typography is styled
- Icons render correctly

**Functional:**
- Navigation works
- Components load
- Charts display data
- Responsive breakpoints work

**Technical:**
- CSS file loads (HTTP 200)
- Tailwind compiled (no @tailwind directives)
- No console errors
- Proper meta tags

---

## Failure Investigation

If tests fail:

1. **Check screenshots** in `test-results/screenshots/`
2. **View HTML report**: `npx playwright show-report`
3. **Watch video**: Available in test-results for failed tests
4. **View trace**: `npx playwright show-trace test-results/.../trace.zip`

---

## CI/CD Integration

These tests are designed to run in CI:
- Set `BASE_URL` environment variable
- Run after deployment
- Capture artifacts on failure
- Block release if critical tests fail

---

**These tests actually validate the visual state, not just DOM existence!**
