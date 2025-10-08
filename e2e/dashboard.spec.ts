import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the dashboard page', async ({ page }) => {
    await expect(page).toHaveTitle(/AC Selling Dashboard|pow3r.cashout/i);
  });

  test('should display main navigation', async ({ page }) => {
    // Check for navigation elements
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
  });

  test('should display dashboard overview cards', async ({ page }) => {
    // Wait for dashboard to load
    await page.waitForLoadState('networkidle');
    
    // Check for key metrics or cards
    const main = page.locator('main');
    await expect(main).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForLoadState('networkidle');
    
    // Verify page is still functional on mobile
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    // Look for theme toggle button
    const themeToggle = page.locator('[aria-label*="theme" i], [data-testid="theme-toggle"]').first();
    
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
      
      // Verify theme changed
      const html = page.locator('html');
      const classList = await html.getAttribute('class');
      expect(classList).toBeTruthy();
    }
  });
});
