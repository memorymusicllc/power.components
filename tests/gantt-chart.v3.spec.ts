import { test, expect } from '@playwright/test';

test.describe('gantt-chartV3 Component', () => {
  test('renders with default props', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('[data-testid="gantt-chart-v3"]')).toBeVisible();
  });

  // Additional tests will be generated based on schema
});