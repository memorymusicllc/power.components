/**
 * Visual Regression Tests
 * Captures baseline screenshots for visual comparison
 * These screenshots document the expected visual state
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression Baselines', () => {
  test('capture dashboard baseline - desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for charts
    
    // Capture baseline screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/baseline-dashboard-desktop.png',
      fullPage: true 
    });
    
    // Verify key elements are visible
    await expect(page.getByRole('heading', { name: /pow3r\.cashout/i })).toBeVisible();
    await expect(page.getByText(/price history/i)).toBeVisible();
    await expect(page.getByText(/lead pipeline/i)).toBeVisible();
  });

  test('capture dashboard baseline - mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Capture mobile baseline
    await page.screenshot({ 
      path: 'test-results/screenshots/baseline-dashboard-mobile.png',
      fullPage: true 
    });
    
    await expect(page.getByRole('heading', { name: /pow3r\.cashout/i })).toBeVisible();
  });

  test('capture component library baseline', async ({ page }) => {
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Capture library baseline
    await page.screenshot({ 
      path: 'test-results/screenshots/baseline-library.png',
      fullPage: true 
    });
    
    await expect(page.getByRole('heading', { name: /component library/i })).toBeVisible();
  });

  test('capture individual widget - Price Chart', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Find and screenshot price chart widget
    const priceChartCard = page.locator('text=/price history/i').locator('..').locator('..');
    await priceChartCard.screenshot({ 
      path: 'test-results/screenshots/widget-price-chart.png' 
    });
    
    await expect(priceChartCard).toBeVisible();
  });

  test('capture individual widget - Leads Chart', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    // Find and screenshot leads chart widget
    const leadsChartCard = page.locator('text=/lead pipeline/i').locator('..').locator('..');
    await leadsChartCard.screenshot({ 
      path: 'test-results/screenshots/widget-leads-chart.png' 
    });
    
    await expect(leadsChartCard).toBeVisible();
  });

  test('capture individual widget - Stats', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find and screenshot stats widget
    const statsCard = page.locator('text=/today\'s activity/i').locator('..').locator('..');
    await statsCard.screenshot({ 
      path: 'test-results/screenshots/widget-stats.png' 
    });
    
    await expect(statsCard).toBeVisible();
  });

  test('capture individual widget - Listings', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot including listings widget
    await page.screenshot({ 
      path: 'test-results/screenshots/widget-listings.png',
      fullPage: true 
    });
    
    // Verify listings widget is visible
    const listingsHeading = page.getByRole('heading', { name: /active listings/i });
    await expect(listingsHeading).toBeVisible();
  });

  test('capture dark mode colors', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get all color values
    const colors = await page.evaluate(() => {
      const body = document.body;
      const html = document.documentElement;
      return {
        bodyBg: window.getComputedStyle(body).backgroundColor,
        bodyText: window.getComputedStyle(body).color,
        htmlClass: html.className,
      };
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/dark-mode-colors.png',
      fullPage: true 
    });
    
    // Verify dark mode is active
    expect(colors.htmlClass).toContain('dark');
    expect(colors.bodyBg).toBeTruthy();
    expect(colors.bodyText).toBeTruthy();
  });
});
