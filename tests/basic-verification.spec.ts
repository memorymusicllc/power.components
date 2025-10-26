import { test, expect } from '@playwright/test';

test.describe('Basic Deployment Verification', () => {
  test('should verify core functionality works', async ({ page }) => {
    // Navigate to the deployment
    await page.goto('https://1f91816b.power-components.pages.dev');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // ✅ REQUIREMENT: Display metadata (Version, Type, Dimensions, Date, tags)
    const firstCard = page.locator('[class*="cursor-pointer"]').first();
    await expect(firstCard).toBeVisible();
    
    // Verify metadata is displayed
    await expect(firstCard.locator('text=/Version:/')).toBeVisible();
    await expect(firstCard.locator('text=/Type:/')).toBeVisible();
    await expect(firstCard.locator('text=/Dimension:/')).toBeVisible();
    await expect(firstCard.locator('text=/Date:/')).toBeVisible();
    
    // Verify tags are displayed
    const tags = firstCard.locator('span[class*="bg-gray-100"]');
    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(0);
    
    // ✅ REQUIREMENT: Interactive components
    // Verify components are clickable
    await firstCard.click();
    
    // Verify modal opens with interactive demo
    await expect(page.locator('text=Interactive Demo')).toBeVisible();
    await expect(page.locator('text=Component Code')).toBeVisible();
    
    // ✅ REQUIREMENT: All header elements present
    // Search
    await expect(page.locator('input[placeholder*="Search components"]')).toBeVisible();
    
    // Multiple filter dropdowns
    const selectElements = page.locator('select');
    const selectCount = await selectElements.count();
    expect(selectCount).toBeGreaterThan(5);
    
    // Component count display
    await expect(page.locator('text=/\\d+ \\/ \\d+ components/')).toBeVisible();
    
    // View mode buttons
    await expect(page.locator('button[title="Grid View"]')).toBeVisible();
    await expect(page.locator('button[title="List View"]')).toBeVisible();
    
    // ✅ REQUIREMENT: Search functionality works
    const searchInput = page.locator('input[placeholder*="Search components"]');
    await searchInput.fill('Button');
    await page.waitForTimeout(1000);
    
    // Verify search results
    const searchResults = page.locator('[class*="cursor-pointer"]');
    const searchCount = await searchResults.count();
    expect(searchCount).toBeGreaterThan(0);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // ✅ REQUIREMENT: Component count verification
    const allComponents = page.locator('[class*="cursor-pointer"]');
    const totalCount = await allComponents.count();
    expect(totalCount).toBeGreaterThan(100); // Should have 129+ components
    
    // Take final verification screenshot
    await page.screenshot({ 
      path: 'screenshots/basic-verification-complete.png',
      fullPage: true 
    });
    
    // Final verification - core requirements met
    expect(totalCount).toBeGreaterThan(100);
    expect(selectCount).toBeGreaterThan(5);
    expect(tagCount).toBeGreaterThan(0);
    
    console.log(`✅ VERIFICATION COMPLETE:`);
    console.log(`   - Components displayed: ${totalCount}`);
    console.log(`   - Filter dropdowns: ${selectCount}`);
    console.log(`   - Tags per component: ${tagCount}`);
    console.log(`   - Search functionality: ✅ Working`);
    console.log(`   - Interactive components: ✅ Working`);
    console.log(`   - Metadata display: ✅ Working`);
  });
});
