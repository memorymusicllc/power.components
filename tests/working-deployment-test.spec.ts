import { test, expect } from '@playwright/test';

test.describe('Working Deployment Test', () => {
  test('should verify deployment is working with all components', async ({ page }) => {
    // Navigate to the deployment
    await page.goto('https://7a709aab.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Enable console logging
    page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`🔍 CONSOLE: ${msg.text()}`);
      }
    });
    
    // ✅ VERIFY: Page loads with correct title
    await expect(page.locator('h1', { hasText: 'Power Components Library v4' })).toBeVisible();
    
    // ✅ VERIFY: All components are present (we know this works from previous tests)
    const componentCards = page.locator('[class*="rounded-lg"].border');
    const cardCount = await componentCards.count();
    console.log(`📊 Total component cards: ${cardCount}`);
    expect(cardCount).toBeGreaterThan(150); // Should have all 153+ components
    
    // ✅ VERIFY: Charts are rendering (SVG elements)
    const svgElements = page.locator('svg');
    const svgCount = await svgElements.count();
    console.log(`🎨 SVG elements (charts): ${svgCount}`);
    expect(svgCount).toBeGreaterThan(300); // Should have many charts
    
    // ✅ VERIFY: Interactive elements are present
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    console.log(`🔘 Buttons: ${buttonCount}`);
    expect(buttonCount).toBeGreaterThan(300);
    
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    console.log(`📝 Inputs: ${inputCount}`);
    expect(inputCount).toBeGreaterThan(0);
    
    // ✅ VERIFY: Search functionality works
    const searchInput = page.locator('input[placeholder*="Search components"]');
    await expect(searchInput).toBeVisible();
    
    // Test search
    await searchInput.fill('Chart');
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('[class*="rounded-lg"].border');
    const searchCount = await searchResults.count();
    console.log(`🔍 Search results: ${searchCount}`);
    expect(searchCount).toBeGreaterThan(0);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // ✅ VERIFY: Modal functionality works
    const firstCard = componentCards.first();
    await firstCard.click();
    
    // Check if modal opens
    const modal = page.locator('.fixed.inset-0.bg-black.bg-opacity-50');
    await expect(modal).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'screenshots/working-deployment-test.png',
      fullPage: true 
    });
    
    console.log(`✅ DEPLOYMENT VERIFICATION COMPLETE:`);
    console.log(`   - Component cards: ${cardCount}`);
    console.log(`   - SVG elements: ${svgCount}`);
    console.log(`   - Buttons: ${buttonCount}`);
    console.log(`   - Inputs: ${inputCount}`);
    console.log(`   - Search results: ${searchCount}`);
    console.log(`   - Modal functionality: ✅ Working`);
    
    // All assertions passed - deployment is working!
    expect(cardCount).toBeGreaterThan(150);
    expect(svgCount).toBeGreaterThan(300);
    expect(buttonCount).toBeGreaterThan(300);
    expect(inputCount).toBeGreaterThan(0);
    expect(searchCount).toBeGreaterThan(0);
  });
});
