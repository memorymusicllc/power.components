import { test, expect } from '@playwright/test';

test.describe('Power Redact Component Library - Final Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Power Redact component in library', async ({ page }) => {
    // Check if Power Redact component is visible in the library
    await expect(page.locator('text=Power Redact Plugin v2.0').first()).toBeVisible();
    
    // Check component metadata
    await expect(page.locator('text=Advanced text redaction plugin')).toBeVisible();
    await expect(page.locator('text=Privacy & Security')).toBeVisible();
    await expect(page.locator('text=v2.0.0')).toBeVisible();
  });

  test('should open Power Redact component details modal', async ({ page }) => {
    // Click on Power Redact component card
    await page.click('text=Power Redact Plugin v2.0');
    
    // Verify modal opens with component details
    await expect(page.locator('h2:has-text("Power Redact Plugin v2.0")')).toBeVisible();
    await expect(page.locator('text=PowerRedact • v2.0.0')).toBeVisible();
    
    // Check for live demo section
    await expect(page.locator('text=Live Demo')).toBeVisible();
    await expect(page.locator('#demo-text')).toBeVisible();
  });

  test('should load Power Redact plugin script', async ({ page }) => {
    // Check if Power Redact script is loaded
    const powerRedactLoaded = await page.evaluate(() => {
      return typeof window.powerRedact !== 'undefined';
    });
    
    expect(powerRedactLoaded).toBe(true);
  });

  test('should have demo text with PII content', async ({ page }) => {
    // Open Power Redact component details
    await page.click('text=Power Redact Plugin v2.0');
    
    // Check demo text contains PII
    const demoText = await page.locator('#demo-text').textContent();
    expect(demoText).toContain('john.doe@example.com');
    expect(demoText).toContain('(555) 123-4567');
    expect(demoText).toContain('123-45-6789');
    expect(demoText).toContain('4532-1234-5678-9012');
  });

  test('should support mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if Power Redact component is still visible
    await expect(page.locator('text=Power Redact Plugin v2.0').first()).toBeVisible();
    
    // Open component details
    await page.click('text=Power Redact Plugin v2.0');
    
    // Verify modal opens in mobile view
    await expect(page.locator('h2:has-text("Power Redact Plugin v2.0")')).toBeVisible();
  });

  test('should have multiple components visible', async ({ page }) => {
    // Count component cards by looking for component titles
    const componentTitles = await page.locator('h3').count();
    
    // Should have multiple components
    expect(componentTitles).toBeGreaterThan(10);
    
    // Check for specific components
    await expect(page.locator('text=Power Redact Plugin v2.0').first()).toBeVisible();
  });

  test('should have working component library structure', async ({ page }) => {
    // Check for Power Redact component
    await expect(page.locator('text=Power Redact Plugin v2.0').first()).toBeVisible();
    
    // Check for component categories
    await expect(page.locator('text=Privacy & Security')).toBeVisible();
    
    // Check for component metadata
    await expect(page.locator('text=Advanced text redaction plugin')).toBeVisible();
  });
});
