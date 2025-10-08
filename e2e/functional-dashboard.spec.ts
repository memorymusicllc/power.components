/**
 * Functional Tests - Dashboard Metrics
 * Tests dashboard metrics and state updates
 * Validates Zustand dashboard store
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard Metrics Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for data to load
  });

  test('should display metrics from dashboard store', async ({ page }) => {
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-dashboard-metrics.png',
      fullPage: true 
    });
    
    // Verify Today's Activity widget
    const activityWidget = page.locator('text=/today\'s activity/i').locator('..');
    await expect(activityWidget).toBeVisible();
    
    // Should display number metrics (from store)
    const numbers = page.locator('p.text-2xl.font-bold');
    const numberCount = await numbers.count();
    expect(numberCount).toBeGreaterThan(0);
  });

  test('should load metrics on page load', async ({ page }) => {
    await page.waitForTimeout(1500); // Wait for store fetch
    
    // Metrics should be populated
    const totalViews = page.getByText(/total views/i).locator('..');
    await expect(totalViews).toBeVisible();
    
    const newLeads = page.getByText(/new leads/i).locator('..');
    await expect(newLeads).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-dashboard-loaded.png',
      fullPage: true 
    });
  });

  test('should refresh metrics when refresh button clicked', async ({ page }) => {
    // Find and click refresh button
    const refreshButton = page.getByRole('button', { name: /refresh/i });
    await expect(refreshButton).toBeVisible();
    
    // Click refresh
    await refreshButton.click();
    
    // Wait for refresh to complete
    await page.waitForTimeout(1000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-dashboard-refreshed.png',
      fullPage: true 
    });
    
    // Metrics should still be visible
    const activityWidget = page.locator('text=/today\'s activity/i');
    await expect(activityWidget).toBeVisible();
  });

  test('should show spinner during refresh', async ({ page }) => {
    const refreshButton = page.getByRole('button', { name: /refresh/i });
    
    // Click refresh
    await refreshButton.click();
    await page.waitForTimeout(100); // Catch spinner immediately
    
    // Look for spinning icon or disabled state
    const isDisabled = await refreshButton.isDisabled();
    
    // Take screenshot during loading
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-dashboard-loading.png',
      fullPage: true 
    });
    
    // Button should be disabled during loading
    expect(isDisabled).toBe(true);
  });
});
