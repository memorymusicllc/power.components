/**
 * Dashboard Functionality Tests
 * Tests core dashboard features and interactions
 * Captures screenshots at each step
 */

import { test, expect } from '@playwright/test';

test.describe('Dashboard Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display complete dashboard with all widgets', async ({ page }) => {
    // Wait for all content to load
    await page.waitForTimeout(1000);
    
    // Take full dashboard screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/dashboard-complete.png',
      fullPage: true 
    });
    
    // Verify title
    const title = page.getByRole('heading', { name: /pow3r\.cashout/i });
    await expect(title).toBeVisible();
    
    // Verify all key widgets are present
    await expect(page.getByRole('heading', { name: /price history/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /lead pipeline/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /today's activity/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /active listings/i })).toBeVisible();
  });

  test('should have NO navigation menu (SPA requirement)', async ({ page }) => {
    // Take screenshot to verify no navigation
    await page.screenshot({ 
      path: 'test-results/screenshots/no-navigation.png',
      fullPage: true 
    });
    
    // Verify no nav elements
    const navCount = await page.locator('nav, [role="navigation"]').count();
    expect(navCount).toBe(0);
    
    // Verify no sidebar
    const sidebarCount = await page.locator('[class*="sidebar"]').count();
    expect(sidebarCount).toBe(0);
  });

  test('should display version number in correct format', async ({ page }) => {
    // Take screenshot of header with version
    await page.screenshot({ 
      path: 'test-results/screenshots/version-display.png' 
    });
    
    // Find version (format: v.DEV.YYYYMMDD.HH.MM.hash)
    const version = page.locator('text=/v\\.\\w+\\.\\d+/');
    await expect(version).toBeVisible();
    
    const versionText = await version.textContent();
    expect(versionText).toMatch(/v\.(DEV|PROD)\.\d{8}\.\d{2}\.\d{2}\./);
  });

  test('should render Price History chart with data', async ({ page }) => {
    await page.waitForTimeout(2000); // Wait for chart render
    
    // Take screenshot of chart area
    const chartCard = page.locator('text=/price history/i').locator('..');
    await chartCard.screenshot({ 
      path: 'test-results/screenshots/price-chart.png' 
    });
    
    // Verify SVG chart exists
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
    
    // Verify chart has lines (price data)
    const lines = page.locator('svg line, svg path[d]');
    const lineCount = await lines.count();
    expect(lineCount).toBeGreaterThan(0);
  });

  test('should render Lead Pipeline chart', async ({ page }) => {
    await page.waitForTimeout(2000);
    
    // Take screenshot of leads chart
    const leadsSection = page.locator('text=/lead pipeline/i').locator('..');
    await leadsSection.screenshot({ 
      path: 'test-results/screenshots/leads-chart.png' 
    });
    
    // Verify pie chart SVG
    const svgs = page.locator('svg');
    const svgCount = await svgs.count();
    expect(svgCount).toBeGreaterThanOrEqual(2); // Price + Leads charts
  });

  test('should display stats with proper formatting', async ({ page }) => {
    // Take screenshot of stats widget
    const statsWidget = page.locator('text=/today\'s activity/i').locator('..');
    await statsWidget.screenshot({ 
      path: 'test-results/screenshots/stats-widget.png' 
    });
    
    // Verify numbers are displayed (use exact match to avoid strict mode violations)
    await expect(page.getByText('2,847', { exact: true })).toBeVisible();
    await expect(page.getByText('47', { exact: true })).toBeVisible();
    await expect(page.getByText('156', { exact: true })).toBeVisible();
  });

  test('should be responsive on mobile (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(500);
    
    // Take mobile screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/mobile-375.png',
      fullPage: true 
    });
    
    // Verify content is still visible
    const title = page.getByRole('heading', { name: /pow3r\.cashout/i });
    await expect(title).toBeVisible();
  });

  test('should be responsive on tablet (768px)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.waitForTimeout(500);
    
    // Take tablet screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/tablet-768.png',
      fullPage: true 
    });
    
    const title = page.getByRole('heading', { name: /pow3r\.cashout/i });
    await expect(title).toBeVisible();
  });

  test('should be responsive on desktop (1920px)', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.waitForTimeout(500);
    
    // Take desktop screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/desktop-1920.png',
      fullPage: true 
    });
    
    const title = page.getByRole('heading', { name: /pow3r\.cashout/i });
    await expect(title).toBeVisible();
  });
});
