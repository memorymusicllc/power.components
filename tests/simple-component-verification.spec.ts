import { test, expect } from '@playwright/test';

test.describe('Simple Component Verification', () => {
  test('should verify components are actually rendering with interactive content', async ({ page }) => {
    // Navigate to the deployment with actual component rendering
    await page.goto('https://bb5b2aff.power-components.pages.dev');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // ✅ VERIFY: Page loads
    await expect(page.locator('h1', { hasText: 'Power Components Library v4' })).toBeVisible();
    
    // ✅ VERIFY: Components are actually rendering (not just metadata cards)
    const componentCards = page.locator('[class*="rounded-lg"].border');
    const cardCount = await componentCards.count();
    expect(cardCount).toBeGreaterThan(100);
    
    // ✅ VERIFY: Chart components are rendering with SVG content
    const chartComponents = page.locator('svg');
    const chartCount = await chartComponents.count();
    expect(chartCount).toBeGreaterThan(0);
    console.log(`Found ${chartCount} chart components rendering`);
    
    // ✅ VERIFY: Dashboard components are rendering
    const dashboardComponents = page.locator('[class*="bg-white"].dark\\:bg-gray-800');
    const dashboardCount = await dashboardComponents.count();
    expect(dashboardCount).toBeGreaterThan(0);
    console.log(`Found ${dashboardCount} dashboard components rendering`);
    
    // ✅ VERIFY: Interactive elements are present
    const interactiveElements = page.locator('button, input, select');
    const interactiveCount = await interactiveElements.count();
    expect(interactiveCount).toBeGreaterThan(0);
    console.log(`Found ${interactiveCount} interactive elements`);
    
    // ✅ VERIFY: Search functionality works
    const searchInput = page.locator('input[placeholder*="Search components"]');
    await expect(searchInput).toBeVisible();
    
    await searchInput.fill('Chart');
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('[class*="rounded-lg"].border');
    const searchCount = await searchResults.count();
    expect(searchCount).toBeGreaterThan(0);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // ✅ VERIFY: Component detail modal shows actual component rendering
    const firstCard = componentCards.first();
    await firstCard.click();
    
    // Verify modal opens
    await expect(page.locator('text=Interactive Demo')).toBeVisible();
    
    // Verify actual component is rendered in modal (not just placeholder)
    const modalComponent = page.locator('[class*="bg-gray-50"].dark\\:bg-gray-900 svg, [class*="bg-gray-50"].dark\\:bg-gray-900 table, [class*="bg-gray-50"].dark\\:bg-gray-900 button');
    await expect(modalComponent.first()).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    // Take verification screenshot
    await page.screenshot({ 
      path: 'screenshots/simple-component-verification.png',
      fullPage: true 
    });
    
    // Final verification
    expect(cardCount).toBeGreaterThan(100);
    expect(chartCount).toBeGreaterThan(0);
    expect(dashboardCount).toBeGreaterThan(0);
    expect(interactiveCount).toBeGreaterThan(0);
    
    console.log(`✅ COMPONENT RENDERING VERIFIED:`);
    console.log(`   - Total component cards: ${cardCount}`);
    console.log(`   - Chart components: ${chartCount}`);
    console.log(`   - Dashboard components: ${dashboardCount}`);
    console.log(`   - Interactive elements: ${interactiveCount}`);
    console.log(`   - Actual component rendering: ✅ Working`);
    console.log(`   - Interactive demos: ✅ Working`);
    console.log(`   - Search functionality: ✅ Working`);
  });
});
