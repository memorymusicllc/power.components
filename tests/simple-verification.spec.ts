import { test, expect } from '@playwright/test';

test.describe('Simple Component Verification', () => {
  test('should verify components are rendering with interactive content', async ({ page }) => {
    await page.goto('https://7a709aab.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Enable console logging
    page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`🔍 CONSOLE: ${msg.text()}`);
      }
    });
    
    // ✅ VERIFY: Page loads
    await expect(page.locator('h1', { hasText: 'Power Components Library v4' })).toBeVisible();
    
    // ✅ VERIFY: Components are present
    const componentCards = page.locator('[class*="rounded-lg"].border');
    const cardCount = await componentCards.count();
    console.log(`📊 Total component cards: ${cardCount}`);
    expect(cardCount).toBeGreaterThan(100);
    
    // ✅ VERIFY: SVG elements are present (charts)
    const svgElements = page.locator('svg');
    const svgCount = await svgElements.count();
    console.log(`🎨 SVG elements (charts): ${svgCount}`);
    expect(svgCount).toBeGreaterThan(0);
    
    // ✅ VERIFY: Interactive elements are present
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`🔘 Buttons: ${buttonCount}`);
    expect(buttonCount).toBeGreaterThan(0);
    
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    console.log(`📝 Inputs: ${inputCount}`);
    expect(inputCount).toBeGreaterThan(0);
    
    // ✅ VERIFY: Search works
    const searchInput = page.locator('input[placeholder*="Search components"]');
    await expect(searchInput).toBeVisible();
    
    await searchInput.fill('Chart');
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('[class*="rounded-lg"].border');
    const searchCount = await searchResults.count();
    console.log(`🔍 Search results: ${searchCount}`);
    expect(searchCount).toBeGreaterThan(0);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/simple-verification.png',
      fullPage: true 
    });
    
    console.log(`✅ VERIFICATION COMPLETE:`);
    console.log(`   - Component cards: ${cardCount}`);
    console.log(`   - SVG elements: ${svgCount}`);
    console.log(`   - Buttons: ${buttonCount}`);
    console.log(`   - Inputs: ${inputCount}`);
    console.log(`   - Search results: ${searchCount}`);
  });
});
