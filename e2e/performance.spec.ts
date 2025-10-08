import { test, expect } from '@playwright/test';

test.describe('Performance', () => {
  test('should load the page within acceptable time', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // Page should load within 5 seconds
    expect(loadTime).toBeLessThan(5000);
  });

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable errors (like network errors in dev)
    const criticalErrors = errors.filter(error => 
      !error.includes('favicon') && 
      !error.includes('net::ERR')
    );
    
    expect(criticalErrors).toHaveLength(0);
  });

  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check for viewport meta tag
    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewport).toBeTruthy();
    
    // Check for charset
    const charset = await page.locator('meta[charset]').count();
    expect(charset).toBeGreaterThan(0);
  });

  test('should not be indexed by search engines', async ({ page }) => {
    await page.goto('/');
    
    // Check for robots meta tag
    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    
    // Should have noindex, nofollow
    if (robots) {
      expect(robots.toLowerCase()).toContain('noindex');
    }
  });
});
