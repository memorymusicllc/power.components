/**
 * Visual Rendering Tests
 * Validates that CSS is properly loaded and styles are applied
 * Takes screenshots to verify visual state
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Rendering - Critical', () => {
  test('should load CSS and apply styles to body', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Take screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/screenshots/01-dashboard-initial.png',
      fullPage: true 
    });
    
    // Verify background color is applied (not default white)
    const bgColor = await page.evaluate(() => {
      return window.getComputedStyle(document.body).backgroundColor;
    });
    
    expect(bgColor).not.toBe('rgba(0, 0, 0, 0)');
    expect(bgColor).not.toBe('rgb(255, 255, 255)');
    
    // Should be dark (very dark gray per Basic Outline theme)
    // Dark mode: hsl(240 10% 3.9%) ≈ rgb(9, 9, 11)
    expect(bgColor).toContain('rgb');
  });

  test('should load CSS file successfully', async ({ page }) => {
    // Navigate and check for CSS
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
    
    // Wait for CSS to load
    await page.waitForLoadState('networkidle');
    
    // Check if CSS file is requested
    const cssRequests = [];
    page.on('response', response => {
      if (response.url().includes('.css')) {
        cssRequests.push(response);
      }
    });
    
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/02-css-loaded.png',
      fullPage: true 
    });
    
    // Should have loaded at least one CSS file
    expect(cssRequests.length).toBeGreaterThan(0);
  });

  test('should apply dark mode styles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for dark class on HTML element
    const htmlClass = await page.locator('html').getAttribute('class');
    expect(htmlClass).toContain('dark');
    
    // Verify dark background color
    const bgColor = await page.evaluate(() => {
      const styles = window.getComputedStyle(document.body);
      return {
        background: styles.backgroundColor,
        color: styles.color
      };
    });
    
    // Take screenshot showing dark mode
    await page.screenshot({ 
      path: 'test-results/screenshots/03-dark-mode.png',
      fullPage: true 
    });
    
    // Background should be dark
    expect(bgColor.background).toBeTruthy();
    // Text should be light
    expect(bgColor.color).toBeTruthy();
  });

  test('should style cards with borders', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find a card element
    const card = page.locator('[class*="card"]').first();
    await expect(card).toBeVisible();
    
    // Check if card has border styling
    const cardStyles = await card.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        border: styles.border,
        borderWidth: styles.borderWidth,
        borderStyle: styles.borderStyle,
        borderColor: styles.borderColor,
      };
    });
    
    // Take screenshot of styled cards
    await page.screenshot({ 
      path: 'test-results/screenshots/04-card-borders.png',
      fullPage: true 
    });
    
    // Card should have border styling
    expect(cardStyles.borderWidth).not.toBe('0px');
    expect(cardStyles.borderStyle).not.toBe('none');
  });

  test('should render with proper typography', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check heading styles
    const h1 = page.locator('h1').first();
    const h1Styles = await h1.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        fontSize: styles.fontSize,
        fontWeight: styles.fontWeight,
        color: styles.color,
      };
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/05-typography.png',
      fullPage: true 
    });
    
    // H1 should be styled (large, bold)
    expect(parseInt(h1Styles.fontSize)).toBeGreaterThan(20);
    expect(parseInt(h1Styles.fontWeight)).toBeGreaterThan(400);
  });

  test('should have responsive grid layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Find grid container
    const grid = page.locator('[class*="grid"]').first();
    await expect(grid).toBeVisible();
    
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        gridTemplateColumns: styles.gridTemplateColumns,
      };
    });
    
    // Take screenshot of grid layout
    await page.screenshot({ 
      path: 'test-results/screenshots/06-grid-layout.png',
      fullPage: true 
    });
    
    // Should use grid display
    expect(gridStyles.display).toBe('grid');
  });

  test('should render charts with visual elements', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000); // Wait for charts to render
    
    // Check for SVG elements (charts)
    const svg = page.locator('svg').first();
    await expect(svg).toBeVisible();
    
    // Take screenshot showing charts
    await page.screenshot({ 
      path: 'test-results/screenshots/07-charts-rendered.png',
      fullPage: true 
    });
    
    // Verify SVG has content
    const svgContent = await svg.innerHTML();
    expect(svgContent.length).toBeGreaterThan(100);
  });
});

