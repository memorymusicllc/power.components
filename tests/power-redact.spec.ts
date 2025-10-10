import { test, expect } from '@playwright/test';

test.describe('Power Redact Component Library', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display Power Redact component in library', async ({ page }) => {
    // Check if Power Redact component is visible in the library
    await expect(page.locator('text=Power Redact Plugin v2.0')).toBeVisible();
    
    // Check component metadata
    await expect(page.locator('text=Advanced text redaction plugin')).toBeVisible();
    await expect(page.locator('text=Privacy & Security')).toBeVisible();
    await expect(page.locator('text=v2.0.0')).toBeVisible();
  });

  test('should open Power Redact component details', async ({ page }) => {
    // Click on Power Redact component card
    await page.click('text=Power Redact Plugin v2.0');
    
    // Verify modal opens with component details
    await expect(page.locator('text=Power Redact Plugin v2.0')).toBeVisible();
    await expect(page.locator('text=PowerRedact • v2.0.0')).toBeVisible();
    
    // Check for live demo section
    await expect(page.locator('text=Live Demo')).toBeVisible();
    await expect(page.locator('text=Try the Power Redact plugin')).toBeVisible();
  });

  test('should load Power Redact plugin script', async ({ page }) => {
    // Check if Power Redact script is loaded
    const powerRedactLoaded = await page.evaluate(() => {
      return typeof window.powerRedact !== 'undefined';
    });
    
    expect(powerRedactLoaded).toBe(true);
  });

  test('should open Power Redact settings from demo', async ({ page }) => {
    // Open Power Redact component details
    await page.click('text=Power Redact Plugin v2.0');
    
    // Click Open Settings button in demo
    await page.click('text=Open Settings');
    
    // Verify settings panel opens
    await expect(page.locator('text=Power Redact Settings v2.0.0')).toBeVisible();
    await expect(page.locator('text=Auto Redact Personally Identifiable Information')).toBeVisible();
  });

  test('should demonstrate PII redaction', async ({ page }) => {
    // Open Power Redact component details
    await page.click('text=Power Redact Plugin v2.0');
    
    // Check demo text contains PII
    const demoText = page.locator('#demo-text');
    await expect(demoText).toContainText('john.doe@example.com');
    await expect(demoText).toContainText('(555) 123-4567');
    await expect(demoText).toContainText('123-45-6789');
    
    // Open settings and enable auto redaction
    await page.click('text=Open Settings');
    await page.check('#autoRedactPII');
    await page.click('text=Save & Close');
    
    // Wait for redaction to occur
    await page.waitForTimeout(1000);
    
    // Check that PII is redacted (should be black blocks)
    const redactedText = await demoText.textContent();
    expect(redactedText).toMatch(/█+/); // Should contain block characters
  });

  test('should clear redactions', async ({ page }) => {
    // Open Power Redact component details
    await page.click('text=Power Redact Plugin v2.0');
    
    // Open settings and enable auto redaction
    await page.click('text=Open Settings');
    await page.check('#autoRedactPII');
    await page.click('text=Save & Close');
    
    // Wait for redaction
    await page.waitForTimeout(1000);
    
    // Click clear redactions
    await page.click('text=Clear Redactions');
    
    // Wait for clearing
    await page.waitForTimeout(500);
    
    // Check that PII is visible again
    const demoText = page.locator('#demo-text');
    await expect(demoText).toContainText('john.doe@example.com');
  });

  test('should support mobile touch interactions', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Open Power Redact component details
    await page.click('text=Power Redact Plugin v2.0');
    
    // Check that demo is visible on mobile
    await expect(page.locator('text=Live Demo')).toBeVisible();
    
    // Test touch interaction with settings
    await page.click('text=Open Settings');
    await expect(page.locator('text=Power Redact Settings v2.0.0')).toBeVisible();
  });

  test('should filter Power Redact component by search', async ({ page }) => {
    // Search for Power Redact
    await page.fill('input[placeholder="Search components..."]', 'redact');
    
    // Should show only Power Redact component
    await expect(page.locator('text=Power Redact Plugin v2.0')).toBeVisible();
    
    // Should not show other components
    await expect(page.locator('text=Dashboard Card Wrapper')).not.toBeVisible();
  });

  test('should filter Power Redact by phase', async ({ page }) => {
    // Filter by Core phase
    await page.selectOption('select', 'Core');
    
    // Should show Power Redact (Core phase)
    await expect(page.locator('text=Power Redact Plugin v2.0')).toBeVisible();
  });

  test('should filter Power Redact by tags', async ({ page }) => {
    // Filter by privacy tag
    await page.selectOption('select:nth-of-type(2)', 'privacy');
    
    // Should show Power Redact (has privacy tag)
    await expect(page.locator('text=Power Redact Plugin v2.0')).toBeVisible();
  });
});

test.describe('Power Redact Plugin Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should initialize with default settings', async ({ page }) => {
    const settings = await page.evaluate(() => {
      return window.powerRedact ? window.powerRedact.settings : null;
    });
    
    expect(settings).toBeTruthy();
    expect(settings.enabled).toBe(true);
    expect(settings.autoRedactPII).toBe(true);
    expect(settings.revealBehavior).toBe('cursor');
    expect(settings.blockStyle).toBe(true);
    expect(settings.touchSupport).toBe(true);
  });

  test('should save and load settings from localStorage', async ({ page }) => {
    // Open settings
    await page.evaluate(() => window.powerRedact.showSettings());
    await expect(page.locator('text=Power Redact Settings v2.0.0')).toBeVisible();
    
    // Change a setting
    await page.uncheck('#autoRedactPII');
    await page.click('text=Save & Close');
    
    // Reload page
    await page.reload();
    
    // Check setting persisted
    const settings = await page.evaluate(() => {
      return window.powerRedact ? window.powerRedact.settings : null;
    });
    
    expect(settings.autoRedactPII).toBe(false);
  });

  test('should handle keyboard shortcuts', async ({ page }) => {
    // Test Ctrl+Shift+R to open settings
    await page.keyboard.press('Control+Shift+KeyR');
    await expect(page.locator('text=Power Redact Settings v2.0.0')).toBeVisible();
    
    // Test Escape to close settings
    await page.keyboard.press('Escape');
    await expect(page.locator('text=Power Redact Settings v2.0.0')).not.toBeVisible();
  });
});
