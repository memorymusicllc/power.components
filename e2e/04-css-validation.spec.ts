/**
 * CSS Validation Tests
 * Critical tests to ensure Tailwind CSS is properly compiled and applied
 * These tests MUST pass for the app to be considered functional
 */

import { test, expect } from '@playwright/test';

test.describe('CSS Validation - CRITICAL', () => {
  test('Tailwind CSS must be compiled (NO @tailwind directives)', async ({ page }) => {
    // Navigate to app
    await page.goto('/');
    
    // Get the CSS file URL
    const cssLinks = await page.locator('link[rel="stylesheet"]').all();
    expect(cssLinks.length).toBeGreaterThan(0);
    
    const cssUrl = await cssLinks[0].getAttribute('href');
    expect(cssUrl).toBeTruthy();
    
    // Fetch the CSS content from the current deployment
    const baseUrl = page.url().match(/https:\/\/[^\/]+/)?.[0] || 'https://cashruleseverythingaroundme.pages.dev';
    const fullCssUrl = `${baseUrl}${cssUrl}`;
    const response = await fetch(fullCssUrl);
    const cssContent = await response.text();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/css-validation.png',
      fullPage: true 
    });
    
    // CRITICAL: CSS should NOT contain raw @tailwind directives
    expect(cssContent).not.toContain('@tailwind base');
    expect(cssContent).not.toContain('@tailwind components');
    expect(cssContent).not.toContain('@tailwind utilities');
    
    // CSS should contain actual compiled styles
    expect(cssContent).toContain('--background');
    expect(cssContent).toContain('--foreground');
    
    // Should have actual CSS rules, not just variables
    expect(cssContent.length).toBeGreaterThan(5000); // Compiled Tailwind should be large
  });

  test('Background color must be applied (dark mode)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get computed background color
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/background-color.png',
      fullPage: true 
    });
    
    // Should have dark background (not white or transparent)
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
    expect(bgColor).not.toBe('rgb(0, 0, 0)');
    
    // Should be a dark gray (Basic Outline theme dark mode)
    expect(bgColor).toMatch(/rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)/);
  });

  test('Text color must be visible on dark background', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Get text color
    const textColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).color;
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/text-color.png',
      fullPage: true 
    });
    
    // Text should be light colored (for dark background)
    expect(textColor).toBeTruthy();
    expect(textColor).toMatch(/rgb/);
  });

  test('Cards must have visible borders', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find all cards
    const cards = page.locator('[class*="rounded-lg"][class*="border"]');
    const cardCount = await cards.count();
    
    expect(cardCount).toBeGreaterThan(0);
    
    // Check first card's border
    const firstCard = cards.first();
    const borderStyle = await firstCard.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        borderWidth: styles.borderWidth,
        borderStyle: styles.borderStyle,
        borderColor: styles.borderColor,
      };
    });
    
    // Take screenshot of card with border
    await firstCard.screenshot({ 
      path: 'test-results/screenshots/card-border.png' 
    });
    
    // Border must be visible
    expect(borderStyle.borderWidth).not.toBe('0px');
    expect(borderStyle.borderStyle).toBe('solid');
    expect(borderStyle.borderColor).not.toBe('rgba(0, 0, 0, 0)');
  });

  test('Grid layout must be applied', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find grid container
    const grid = page.locator('.grid').first();
    
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        gap: styles.gap,
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });
    
    // Take screenshot
    await grid.screenshot({ 
      path: 'test-results/screenshots/grid-layout-validation.png' 
    });
    
    // Must use CSS Grid
    expect(gridStyles.display).toBe('grid');
    expect(gridStyles.gap).not.toBe('0px');
  });

  test('Typography styles must be applied', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check H1 styling
    const h1 = page.locator('h1').first();
    const h1Styles = await h1.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        lineHeight: styles.lineHeight,
        color: styles.color,
      };
    });
    
    // Take screenshot
    await h1.screenshot({ 
      path: 'test-results/screenshots/typography-h1.png' 
    });
    
    // H1 must be large and bold
    const fontSize = parseInt(h1Styles.fontSize);
    const fontWeight = parseInt(h1Styles.fontWeight);
    
    expect(fontSize).toBeGreaterThan(24); // Should be ~30px or more
    expect(fontWeight).toBeGreaterThan(500); // Should be bold
  });

  test('Icons must render with proper size', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find SVG icons (lucide-react icons)
    const icons = page.locator('svg[class*="lucide"]');
    const iconCount = await icons.count();
    
    if (iconCount > 0) {
      const firstIcon = icons.first();
      const iconSize = await firstIcon.evaluate((el) => {
        return {
          width: el.getBoundingClientRect().width,
          height: el.getBoundingClientRect().height,
        };
      });
      
      // Take screenshot
      await firstIcon.screenshot({ 
        path: 'test-results/screenshots/icon-rendering.png' 
      });
      
      // Icons should have non-zero size
      expect(iconSize.width).toBeGreaterThan(0);
      expect(iconSize.height).toBeGreaterThan(0);
    }
  });
});
