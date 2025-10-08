/**
 * Functional Tests - Auto Responder
 * Tests auto-responder rules management
 * Validates Zustand auto-responder store
 */

import { test, expect } from '@playwright/test';

test.describe('Auto-Responder Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Wait for stores to load
  });

  test('should display auto-responder stats from store', async ({ page }) => {
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/functional-autoresponder-display.png',
      fullPage: true 
    });
    
    // Find auto-responder widget
    const autoResponderWidget = page.locator('text=/auto-responder/i').locator('..');
    await expect(autoResponderWidget).toBeVisible();
    
    // Should show active rules count
    const activeRules = page.locator('text=/active rules/i').locator('..');
    await expect(activeRules).toBeVisible();
    
    // Should show total rules count
    const totalRules = page.locator('text=/total rules/i').locator('..');
    await expect(totalRules).toBeVisible();
  });

  test('should load rules data on mount', async ({ page }) => {
    await page.waitForTimeout(1500); // Wait for async fetch
    
    // Rules should be loaded
    const autoResponderWidget = page.locator('text=/auto-responder/i').locator('..');
    
    // Take screenshot
    await autoResponderWidget.screenshot({ 
      path: 'test-results/screenshots/functional-autoresponder-loaded.png' 
    });
    
    await expect(autoResponderWidget).toBeVisible();
  });
});
