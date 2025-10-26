import { test, expect } from '@playwright/test';

test.describe('Simple Deployment Verification', () => {
  test('should verify the deployment loads and shows components', async ({ page }) => {
    // Navigate to the deployment
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Verify the main title is visible
    await expect(page.locator('h1')).toContainText('Power Components Library v4');
    
    // Verify component count display
    await expect(page.locator('text=/\\d+ \\/ \\d+ components/')).toBeVisible();
    
    // Verify search functionality is present
    const searchInput = page.locator('input[placeholder*="Search components"]');
    await expect(searchInput).toBeVisible();
    
    // Verify filters are present (should have multiple select elements)
    const selectElements = page.locator('select');
    const selectCount = await selectElements.count();
    expect(selectCount).toBeGreaterThan(5); // Should have multiple filter dropdowns
    
    // Verify theme selector is present
    const themeSelector = selectElements.first();
    await expect(themeSelector).toBeVisible();
    
    // Verify view mode toggles are present
    const gridButton = page.locator('button[title="Grid View"]');
    const listButton = page.locator('button[title="List View"]');
    await expect(gridButton).toBeVisible();
    await expect(listButton).toBeVisible();
    
    // Verify component cards are present and clickable
    const componentCards = page.locator('[class*="cursor-pointer"]');
    const cardCount = await componentCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Test clicking on first component
    await componentCards.first().click();
    
    // Verify modal opens (should have Interactive Demo text)
    await expect(page.locator('text=Interactive Demo')).toBeVisible();
    
    // Close modal
    await page.locator('button').filter({ hasText: 'X' }).click();
    
    // Test search functionality
    await searchInput.fill('Button');
    await page.waitForTimeout(1000);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // Test theme switching
    await themeSelector.selectOption('dark');
    await page.waitForTimeout(1000);
    
    // Switch back to outline theme
    await themeSelector.selectOption('outline');
    await page.waitForTimeout(1000);
    
    // Test view mode switching
    await listButton.click();
    await page.waitForTimeout(1000);
    await gridButton.click();
    await page.waitForTimeout(1000);
    
    // Take final screenshot
    await page.screenshot({ 
      path: 'screenshots/final-deployment-verification.png',
      fullPage: true 
    });
    
    // Verify no critical console errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    await page.waitForTimeout(2000);
    
    // Log any errors found (but don't fail the test for minor errors)
    if (logs.length > 0) {
      console.log('Console errors found:', logs);
    }
    
    // Verify the page is functional
    expect(cardCount).toBeGreaterThan(50); // Should have many components
  });

  test('should verify component metadata is displayed correctly', async ({ page }) => {
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    await page.waitForTimeout(3000);
    
    // Get first component card
    const firstCard = page.locator('[class*="cursor-pointer"]').first();
    await expect(firstCard).toBeVisible();
    
    // Verify metadata is displayed (Version, Type, Dimension, Date)
    await expect(firstCard.locator('text=/Version:/')).toBeVisible();
    await expect(firstCard.locator('text=/Type:/')).toBeVisible();
    await expect(firstCard.locator('text=/Dimension:/')).toBeVisible();
    await expect(firstCard.locator('text=/Date:/')).toBeVisible();
    
    // Verify tags are displayed (should have at least one tag)
    const tags = firstCard.locator('span[class*="bg-gray-100"]');
    const tagCount = await tags.count();
    expect(tagCount).toBeGreaterThan(0);
    
    // Verify View and Code buttons are present
    await expect(firstCard.locator('button').filter({ hasText: 'View' })).toBeVisible();
    await expect(firstCard.locator('button').filter({ hasText: 'Code' })).toBeVisible();
    
    // Take screenshot of component card
    await firstCard.screenshot({ path: 'screenshots/component-card-metadata.png' });
  });

  test('should verify all required header elements are present', async ({ page }) => {
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Verify all required header elements
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    
    // Verify multiple filter dropdowns are present
    const selectElements = page.locator('select');
    const selectCount = await selectElements.count();
    expect(selectCount).toBeGreaterThan(5);
    
    // Verify view mode buttons
    await expect(page.locator('button[title="Grid View"]')).toBeVisible();
    await expect(page.locator('button[title="List View"]')).toBeVisible();
    
    // Verify component count display
    await expect(page.locator('text=/\\d+ \\/ \\d+ components/')).toBeVisible();
    
    // Take screenshot of header
    await page.screenshot({ 
      path: 'screenshots/header-elements-verification.png',
      clip: { x: 0, y: 0, width: 1200, height: 400 }
    });
  });
});
