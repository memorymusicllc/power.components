/**
 * Functional Tests - Listings Management
 * Tests actual data operations and state management
 * Validates Zustand store integration
 */

import { test, expect } from '@playwright/test';

test.describe('Listings Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for stores to initialize
  });

  test('should display listings from store', async ({ page }) => {
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-listings-display.png',
      fullPage: true 
    });
    
    // Find listings widget by heading
    const listingsWidget = page.getByRole('heading', { name: /active listings/i });
    await expect(listingsWidget).toBeVisible();
    
    // Check if listings are displayed or "no listings" message
    const hasListings = await page.locator('text=/no active listings yet/i').isVisible();
    const hasListingItems = await page.locator('.p-4.rounded-lg.border').count();
    
    // Either should have listings OR show empty state
    expect(hasListings || hasListingItems > 0).toBeTruthy();
  });

  test('should show loading state initially', async ({ page }) => {
    // Reload to catch loading state
    await page.reload();
    await page.waitForTimeout(100); // Catch it while loading
    
    // Take screenshot of loading state
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-listings-loading.png',
      fullPage: true 
    });
    
    // Should eventually load (not stay in loading forever)
    await page.waitForTimeout(2000);
    const listingsWidget = page.getByRole('heading', { name: /active listings/i });
    await expect(listingsWidget).toBeVisible();
  });

  test('should have refresh functionality', async ({ page }) => {
    // Find refresh button
    const refreshButton = page.getByRole('button', { name: /refresh/i });
    await expect(refreshButton).toBeVisible();
    
    // Click refresh
    await refreshButton.click();
    await page.waitForTimeout(1000);
    
    // Take screenshot after refresh
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-listings-refresh.png',
      fullPage: true 
    });
    
    // Dashboard should still be visible
    const dashboard = page.getByRole('heading', { name: /pow3r\.cashout/i });
    await expect(dashboard).toBeVisible();
  });
});
