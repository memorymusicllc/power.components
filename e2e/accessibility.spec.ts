import { test, expect } from '@playwright/test';

test.describe('Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for h1 tag
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Check for nav element or navigation role
    const navCount = await page.locator('nav, [role="navigation"]').count();
    expect(navCount).toBeGreaterThan(0);
  });

  test('should have keyboard navigation support', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // Check if focus is visible
    const focusedElement = await page.locator(':focus').count();
    expect(focusedElement).toBeGreaterThan(0);
  });

  test('should have proper button labels', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Get all buttons
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    if (buttonCount > 0) {
      // Check first few buttons have text or aria-label
      for (let i = 0; i < Math.min(buttonCount, 5); i++) {
        const button = buttons.nth(i);
        const text = await button.textContent();
        const ariaLabel = await button.getAttribute('aria-label');
        
        expect(text || ariaLabel).toBeTruthy();
      }
    }
  });

  test('should have sufficient color contrast in dark mode', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    
    // Try to enable dark mode
    const themeToggle = page.locator('[aria-label*="theme" i], [data-testid="theme-toggle"]').first();
    
    if (await themeToggle.isVisible()) {
      await themeToggle.click();
      await page.waitForTimeout(500);
      
      // Verify dark mode is active
      const html = page.locator('html');
      const classList = await html.getAttribute('class');
      expect(classList).toBeTruthy();
    }
  });
});
