import { test, expect } from '@playwright/test';

test.describe('Component Rendering Verification', () => {
  test('should verify actual components are rendering instead of just metadata', async ({ page }) => {
    // Navigate to the deployment with actual component rendering
    await page.goto('https://bb5b2aff.power-components.pages.dev');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // ✅ VERIFY: Page loads with actual components
    await expect(page.locator('h1', { hasText: 'Power Components Library v4' })).toBeVisible();
    
    // ✅ VERIFY: Components are actually rendering (not just metadata cards)
    const componentCards = page.locator('[class*="rounded-lg"].border');
    const cardCount = await componentCards.count();
    expect(cardCount).toBeGreaterThan(100);
    
    // Check that components have actual rendered content, not just metadata
    for (let i = 0; i < Math.min(5, cardCount); i++) {
      const card = componentCards.nth(i);
      
      // Verify component header exists
      await expect(card.locator('h3').first()).toBeVisible();
      
      // Verify component content area exists (where actual components render)
      const contentArea = card.locator('div').filter({ hasText: /Version:|Type:|Dimension:/ }).first();
      await expect(contentArea).toBeVisible();
      
      // Verify there's actual component content (charts, dashboards, etc.)
      // Look for SVG elements (charts), tables, or other interactive elements
      const hasCharts = await card.locator('svg').count() > 0;
      const hasTables = await card.locator('table').count() > 0;
      const hasButtons = await card.locator('button').count() > 0;
      const hasInputs = await card.locator('input').count() > 0;
      
      // At least one of these should be true for actual component rendering
      const hasInteractiveContent = hasCharts || hasTables || hasButtons || hasInputs;
      expect(hasInteractiveContent).toBeTruthy();
    }
    
    // ✅ VERIFY: Chart components are rendering
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
    
    // ✅ VERIFY: Search functionality still works
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
      path: 'screenshots/component-rendering-verification.png',
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

  test('should verify specific component types are rendering correctly', async ({ page }) => {
    await page.goto('https://bb5b2aff.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Test chart components
    const chartCards = page.locator('[class*="rounded-lg"].border').filter({ hasText: /Chart|Pie|Line|Bar/ });
    const chartCardCount = await chartCards.count();
    expect(chartCardCount).toBeGreaterThan(0);
    
    // Verify at least one chart has SVG content
    let hasChartContent = false;
    for (let i = 0; i < Math.min(3, chartCardCount); i++) {
      const chartCard = chartCards.nth(i);
      const svgCount = await chartCard.locator('svg').count();
      if (svgCount > 0) {
        hasChartContent = true;
        break;
      }
    }
    expect(hasChartContent).toBeTruthy();
    
    // Test dashboard components
    const dashboardCards = page.locator('[class*="rounded-lg"].border').filter({ hasText: /Dashboard|Metrics|KPI/ });
    const dashboardCardCount = await dashboardCards.count();
    expect(dashboardCardCount).toBeGreaterThan(0);
    
    // Verify at least one dashboard has interactive content
    let hasDashboardContent = false;
    for (let i = 0; i < Math.min(3, dashboardCardCount); i++) {
      const dashboardCard = dashboardCards.nth(i);
      const interactiveCount = await dashboardCard.locator('button, input, table, svg').count();
      if (interactiveCount > 0) {
        hasDashboardContent = true;
        break;
      }
    }
    expect(hasDashboardContent).toBeTruthy();
    
    // Test UI components
    const uiCards = page.locator('[class*="rounded-lg"].border').filter({ hasText: /Button|Card|Input|Progress/ });
    const uiCardCount = await uiCards.count();
    expect(uiCardCount).toBeGreaterThan(0);
    
    console.log(`✅ SPECIFIC COMPONENT TYPES VERIFIED:`);
    console.log(`   - Chart components: ${chartCardCount} (with SVG content: ${hasChartContent})`);
    console.log(`   - Dashboard components: ${dashboardCardCount} (with interactive content: ${hasDashboardContent})`);
    console.log(`   - UI components: ${uiCardCount}`);
  });
});
