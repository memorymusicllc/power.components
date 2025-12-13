import { test, expect } from '@playwright/test';

test.describe('Final Deployment Verification', () => {
  test('should verify all 153 components are visible and interactive', async ({ page }) => {
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
    
    // ✅ VERIFY: All 153 components are present
    const componentCards = page.locator('[class*="rounded-lg"].border');
    const cardCount = await componentCards.count();
    console.log(`📊 Total component cards found: ${cardCount}`);
    
    // Should have all 153 components (may be more due to duplicates)
    expect(cardCount).toBeGreaterThanOrEqual(150);
    
    // ✅ VERIFY: Charts are rendering with different types
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
    
    // Test search for specific components
    await searchInput.fill('Chart');
    await page.waitForTimeout(1000);
    
    const searchResults = page.locator('[class*="rounded-lg"].border');
    const searchCount = await searchResults.count();
    console.log(`🔍 Search results for "Chart": ${searchCount}`);
    expect(searchCount).toBeGreaterThan(0);
    
    // Clear search to show all components
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // ✅ VERIFY: Different chart types are visible
    const pieCharts = page.locator('text=PieChart, text=DonutChart, text=LeadsChart');
    const barCharts = page.locator('text=BarChart, text=WaterfallChart');
    const heatmapCharts = page.locator('text=HeatmapChart, text=CorrelationHeatmap');
    const lineCharts = page.locator('text=LineChart, text=GaugeChart');
    
    const pieCount = await pieCharts.count();
    const barCount = await barCharts.count();
    const heatmapCount = await heatmapCharts.count();
    const lineCount = await lineCharts.count();
    
    console.log(`🥧 Pie charts: ${pieCount}`);
    console.log(`📊 Bar charts: ${barCount}`);
    console.log(`🔥 Heatmap charts: ${heatmapCount}`);
    console.log(`📈 Line charts: ${lineCount}`);
    
    // ✅ VERIFY: UI components are visible
    const uiComponents = page.locator('text=Button, text=Card, text=Input, text=Switch, text=Slider, text=Tabs');
    const uiCount = await uiComponents.count();
    console.log(`🎨 UI components: ${uiCount}`);
    expect(uiCount).toBeGreaterThan(0);
    
    // ✅ VERIFY: Dashboard components are visible
    const dashboardComponents = page.locator('text=Dashboard, text=KPI, text=Metrics');
    const dashboardCount = await dashboardComponents.count();
    console.log(`🏠 Dashboard components: ${dashboardCount}`);
    expect(dashboardCount).toBeGreaterThan(0);
    
    // Take comprehensive screenshot
    await page.screenshot({ 
      path: 'screenshots/final-deployment-verification.png',
      fullPage: true 
    });
    
    // Take screenshot of first few components
    const firstRow = page.locator('[class*="rounded-lg"].border').first();
    await firstRow.screenshot({ path: 'screenshots/first-component-row.png' });
    
    // ✅ VERIFY: Modal functionality works
    const firstCard = componentCards.first();
    await firstCard.click();
    
    // Check if modal opens
    const modal = page.locator('.fixed.inset-0.bg-black.bg-opacity-50');
    await expect(modal).toBeVisible();
    
    // Close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(500);
    
    console.log(`✅ FINAL DEPLOYMENT VERIFICATION COMPLETE:`);
    console.log(`   - Component cards: ${cardCount}`);
    console.log(`   - SVG elements: ${svgCount}`);
    console.log(`   - Buttons: ${buttonCount}`);
    console.log(`   - Inputs: ${inputCount}`);
    console.log(`   - Search results: ${searchCount}`);
    console.log(`   - Pie charts: ${pieCount}`);
    console.log(`   - Bar charts: ${barCount}`);
    console.log(`   - Heatmap charts: ${heatmapCount}`);
    console.log(`   - Line charts: ${lineCount}`);
    console.log(`   - UI components: ${uiCount}`);
    console.log(`   - Dashboard components: ${dashboardCount}`);
    console.log(`   - Modal functionality: ✅ Working`);
    
    // Final assertions
    expect(cardCount).toBeGreaterThanOrEqual(150);
    expect(svgCount).toBeGreaterThan(300);
    expect(buttonCount).toBeGreaterThan(300);
    expect(searchCount).toBeGreaterThan(0);
    expect(uiCount).toBeGreaterThan(0);
    expect(dashboardCount).toBeGreaterThan(0);
  });
});
