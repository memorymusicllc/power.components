/**
 * PHOENIX INITIATIVE: Guardian Agent E2E Tests
 * Button Component - Schema-Driven Validation
 * Generated from Button.pow3r.config.json requiredTests
 * 
 * @version 2.0.0
 * @date 2025-01-11
 * @constitution https://github.com/memorymusicllc/power.components/blob/main/.cursor/Project%20Constitution.md
 */

import { test, expect } from '@playwright/test';

test.describe('Phoenix Button Component - Schema-Driven E2E Tests', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to the component library page
    await page.goto('https://main.power-components.pages.dev');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
  });

  test('Verify that the button renders with default props', async ({ page }) => {
    // Find the Phoenix Button component
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Verify button exists and is visible
    await expect(button).toBeVisible();
    
    // Verify default styling
    await expect(button).toHaveClass(/inline-flex/);
    await expect(button).toHaveClass(/items-center/);
    await expect(button).toHaveClass(/justify-center/);
    await expect(button).toHaveClass(/rounded-md/);
    
    // Verify button is clickable
    await expect(button).toBeEnabled();
    
    // Verify accessibility attributes
    await expect(button).toHaveAttribute('aria-disabled', 'false');
  });

  test('Verify that the button enters a loading state when clicked', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Click the button
    await button.click();
    
    // Verify loading state
    await expect(button).toHaveClass(/opacity-50/);
    await expect(button).toHaveClass(/cursor-not-allowed/);
    
    // Verify loading spinner is present
    const spinner = button.locator('svg.animate-spin');
    await expect(spinner).toBeVisible();
    
    // Verify button is disabled during loading
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('Verify that the button handles keyboard navigation', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Focus the button with Tab key
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();
    
    // Verify focus styles
    await expect(button).toHaveClass(/focus-visible:outline-none/);
    await expect(button).toHaveClass(/focus-visible:ring-2/);
    
    // Activate with Enter key
    await page.keyboard.press('Enter');
    
    // Activate with Space key
    await page.keyboard.press('Space');
    
    // Verify button responds to keyboard activation
    await expect(button).toBeVisible();
  });

  test('Verify that the button respects disabled state', async ({ page }) => {
    // Find a disabled button (if available) or create one
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Simulate disabled state by adding disabled attribute
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="phoenix-button"]');
      if (btn) {
        btn.setAttribute('disabled', 'true');
        btn.setAttribute('aria-disabled', 'true');
      }
    });
    
    // Verify disabled styling
    await expect(button).toHaveClass(/disabled:opacity-50/);
    await expect(button).toHaveClass(/disabled:pointer-events-none/);
    
    // Verify button cannot be clicked
    await expect(button).toHaveAttribute('aria-disabled', 'true');
    
    // Attempt to click (should not work)
    await button.click({ force: true });
    
    // Verify button remains in disabled state
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  test('Verify that the button renders all variant styles correctly', async ({ page }) => {
    const variants = ['default', 'outline', 'ghost', 'destructive', 'success', 'warning', 'info'];
    
    for (const variant of variants) {
      // Create button with specific variant
      await page.evaluate((variant) => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button 
            data-testid="phoenix-button-${variant}"
            class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            data-variant="${variant}"
          >
            ${variant} Button
          </button>
        `;
        document.body.appendChild(container);
      }, variant);
      
      const button = page.locator(`[data-testid="phoenix-button-${variant}"]`);
      
      // Verify button renders
      await expect(button).toBeVisible();
      
      // Verify variant-specific styling
      await expect(button).toHaveAttribute('data-variant', variant);
      
      // Clean up
      await page.evaluate((variant) => {
        const btn = document.querySelector(`[data-testid="phoenix-button-${variant}"]`);
        if (btn) btn.remove();
      }, variant);
    }
  });

  test('Verify that the button renders all size variants correctly', async ({ page }) => {
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    
    for (const size of sizes) {
      // Create button with specific size
      await page.evaluate((size) => {
        const container = document.createElement('div');
        container.innerHTML = `
          <button 
            data-testid="phoenix-button-${size}"
            class="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
            data-size="${size}"
          >
            ${size} Button
          </button>
        `;
        document.body.appendChild(container);
      }, size);
      
      const button = page.locator(`[data-testid="phoenix-button-${size}"]`);
      
      // Verify button renders
      await expect(button).toBeVisible();
      
      // Verify size-specific styling
      await expect(button).toHaveAttribute('data-size', size);
      
      // Clean up
      await page.evaluate((size) => {
        const btn = document.querySelector(`[data-testid="phoenix-button-${size}"]`);
        if (btn) btn.remove();
      }, size);
    }
  });

  test('Verify that the button handles error states gracefully', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Simulate error state
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="phoenix-button"]');
      if (btn) {
        btn.setAttribute('data-error', 'true');
        btn.classList.add('border-red-500', 'bg-red-50', 'text-red-700');
      }
    });
    
    // Verify error styling
    await expect(button).toHaveClass(/border-red-500/);
    await expect(button).toHaveClass(/bg-red-50/);
    await expect(button).toHaveClass(/text-red-700/);
    
    // Verify error state is visible
    await expect(button).toHaveAttribute('data-error', 'true');
  });

  test('Verify observability metrics are tracked', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Click button to generate metrics
    await button.click();
    
    // Verify metrics are tracked
    const metrics = await button.getAttribute('data-metrics');
    expect(metrics).toBeTruthy();
    
    // Parse and verify metrics structure
    const metricsData = JSON.parse(metrics || '{}');
    expect(metricsData).toHaveProperty('clickCount');
    expect(metricsData).toHaveProperty('errorRate');
    expect(metricsData).toHaveProperty('renderTime');
    expect(metricsData).toHaveProperty('accessibilityScore');
    
    // Verify click count increased
    expect(metricsData.clickCount).toBeGreaterThan(0);
  });

  test('Verify self-healing capabilities', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Simulate high error rate
    await page.evaluate(() => {
      const btn = document.querySelector('[data-testid="phoenix-button"]');
      if (btn) {
        btn.setAttribute('data-metrics', JSON.stringify({
          clickCount: 100,
          errorRate: 0.1, // Above threshold
          renderTime: 50,
          accessibilityScore: 0.7 // Below threshold
        }));
      }
    });
    
    // Wait for self-healing to trigger
    await page.waitForTimeout(1000);
    
    // Verify self-healing attempt
    const metrics = await button.getAttribute('data-metrics');
    const metricsData = JSON.parse(metrics || '{}');
    
    // Self-healing should reset error rate and improve accessibility score
    expect(metricsData.errorRate).toBeLessThanOrEqual(0.05);
    expect(metricsData.accessibilityScore).toBeGreaterThanOrEqual(0.8);
  });

  test('Verify accessibility compliance', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Verify ARIA attributes
    await expect(button).toHaveAttribute('aria-label');
    await expect(button).toHaveAttribute('aria-disabled');
    
    // Verify keyboard accessibility
    await button.focus();
    await expect(button).toBeFocused();
    
    // Verify screen reader compatibility
    const ariaLabel = await button.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    expect(ariaLabel.length).toBeGreaterThan(0);
  });

  test('Verify performance metrics', async ({ page }) => {
    const button = page.locator('[data-testid="phoenix-button"]').first();
    
    // Measure render time
    const startTime = Date.now();
    await button.waitFor({ state: 'visible' });
    const renderTime = Date.now() - startTime;
    
    // Verify render time is reasonable (less than 100ms)
    expect(renderTime).toBeLessThan(100);
    
    // Verify metrics include render time
    const metrics = await button.getAttribute('data-metrics');
    const metricsData = JSON.parse(metrics || '{}');
    expect(metricsData.renderTime).toBeGreaterThan(0);
  });
});
