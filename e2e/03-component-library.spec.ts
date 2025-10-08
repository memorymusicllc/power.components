/**
 * Component Library Tests
 * Validates component library page functionality
 * Captures screenshots of components
 */

import { test, expect } from '@playwright/test';

test.describe('Component Library', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/library');
    await page.waitForLoadState('networkidle');
  });

  test('should load library page with proper styling', async ({ page }) => {
    // Take full library screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/library-full.png',
      fullPage: true 
    });
    
    // Verify heading (in header bar)
    const heading = page.getByRole('heading', { level: 1 });
    await expect(heading).toBeVisible();
    
    // Verify heading is styled
    const headingStyles = await heading.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
      };
    });
    
    expect(parseInt(headingStyles.fontSize)).toBeGreaterThanOrEqual(18);
    expect(parseInt(headingStyles.fontWeight)).toBeGreaterThan(400);
  });

  test('should display back button with styles', async ({ page }) => {
    const backButton = page.getByRole('button', { name: /dashboard/i });
    await expect(backButton).toBeVisible();
    
    // Take screenshot of back button
    await backButton.screenshot({ 
      path: 'test-results/screenshots/back-button.png' 
    });
    
    // Verify button has styling
    const buttonStyles = await backButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        padding: styles.padding,
        cursor: styles.cursor,
      };
    });
    
    expect(buttonStyles.padding).not.toBe('0px');
    expect(buttonStyles.cursor).toBe('pointer');
  });

  test('should navigate back to dashboard', async ({ page }) => {
    const backButton = page.getByRole('button', { name: /dashboard/i });
    await backButton.click();
    
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Take screenshot of dashboard after navigation
    await page.screenshot({ 
      path: 'test-results/screenshots/navigation-to-dashboard.png',
      fullPage: true 
    });
    
    // Should be on dashboard
    const dashboardTitle = page.getByRole('heading', { name: /pow3r\.cashout/i });
    await expect(dashboardTitle).toBeVisible();
  });

  test('should display component metadata cards', async ({ page }) => {
    // Take screenshot of metadata section
    await page.screenshot({ 
      path: 'test-results/screenshots/metadata-cards.png',
      fullPage: true 
    });
    
    // Look for metadata labels (Component, Updated, Category, Tags in the new design)
    const categoryLabel = page.getByText(/category/i).first();
    await expect(categoryLabel).toBeVisible();
    
    // Look for version badges
    const versionBadge = page.locator('text=/v\\d+\\.\\d+\\.\\d+/').first();
    await expect(versionBadge).toBeVisible();
  });

  test('should render component previews', async ({ page }) => {
    await page.waitForTimeout(2000); // Wait for charts to render
    
    // Take screenshot of component previews
    await page.screenshot({ 
      path: 'test-results/screenshots/component-previews.png',
      fullPage: true 
    });
    
    // Verify preview text is shown
    const preview = page.getByText(/component preview/i).first();
    await expect(preview).toBeVisible();
    
    // Verify charts are rendered in preview
    const svgCount = await page.locator('svg').count();
    expect(svgCount).toBeGreaterThanOrEqual(2);
  });

  test('should display sections properly', async ({ page }) => {
    // Scroll through sections and take screenshots
    const sections = page.locator('section');
    const sectionCount = await sections.count();
    
    expect(sectionCount).toBeGreaterThan(0);
    
    // Take screenshot showing sections
    await page.screenshot({ 
      path: 'test-results/screenshots/library-sections.png',
      fullPage: true 
    });
  });
});
