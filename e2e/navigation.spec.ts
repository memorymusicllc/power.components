import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to listings page', async ({ page }) => {
    // Look for listings link
    const listingsLink = page.locator('a[href*="listing" i]').first();
    
    if (await listingsLink.isVisible()) {
      await listingsLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('listing');
    }
  });

  test('should navigate to leads page', async ({ page }) => {
    // Look for leads link
    const leadsLink = page.locator('a[href*="lead" i]').first();
    
    if (await leadsLink.isVisible()) {
      await leadsLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('lead');
    }
  });

  test('should navigate to auto-responder page', async ({ page }) => {
    // Look for auto-responder link
    const autoResponderLink = page.locator('a[href*="auto-respond" i]').first();
    
    if (await autoResponderLink.isVisible()) {
      await autoResponderLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('auto-respond');
    }
  });

  test('should navigate to settings page', async ({ page }) => {
    // Look for settings link
    const settingsLink = page.locator('a[href*="setting" i]').first();
    
    if (await settingsLink.isVisible()) {
      await settingsLink.click();
      await page.waitForLoadState('networkidle');
      expect(page.url()).toContain('setting');
    }
  });

  test('should handle browser back button', async ({ page }) => {
    const listingsLink = page.locator('a[href*="listing" i]').first();
    
    if (await listingsLink.isVisible()) {
      const initialUrl = page.url();
      await listingsLink.click();
      await page.waitForLoadState('networkidle');
      
      await page.goBack();
      await page.waitForLoadState('networkidle');
      
      expect(page.url()).toBe(initialUrl);
    }
  });
});
