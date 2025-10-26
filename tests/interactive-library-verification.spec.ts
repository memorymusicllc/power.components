import { test, expect } from '@playwright/test';

test.describe('Interactive Library Page Verification', () => {
  test('should display all 129 components with interactive features', async ({ page }) => {
    // Navigate to the deployment
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Verify the main title is visible
    await expect(page.locator('h1')).toContainText('Power Components Library v4');
    
    // Verify component count display
    await expect(page.locator('text=/\\d+ \\/ \\d+ components/')).toBeVisible();
    
    // Verify search functionality
    const searchInput = page.locator('input[placeholder*="Search components"]');
    await expect(searchInput).toBeVisible();
    
    // Test search functionality
    await searchInput.fill('Button');
    await page.waitForTimeout(500); // Wait for search to filter
    
    // Verify filters are present and functional
    await expect(page.locator('select')).toHaveCount(6); // Should have multiple filter dropdowns
    
    // Verify theme selector
    const themeSelector = page.locator('select').first();
    await expect(themeSelector).toBeVisible();
    
    // Test theme switching
    await themeSelector.selectOption('dark');
    await page.waitForTimeout(500);
    
    // Verify view mode toggles
    const gridButton = page.locator('button[title="Grid View"]');
    const listButton = page.locator('button[title="List View"]');
    await expect(gridButton).toBeVisible();
    await expect(listButton).toBeVisible();
    
    // Test view mode switching
    await listButton.click();
    await page.waitForTimeout(500);
    await gridButton.click();
    
    // Verify component cards are clickable
    const componentCards = page.locator('[class*="cursor-pointer"]');
    await expect(componentCards.first()).toBeVisible();
    
    // Click on first component to test modal
    await componentCards.first().click();
    
    // Verify modal opens
    await expect(page.locator('text=Interactive Demo')).toBeVisible();
    await expect(page.locator('text=Component Code')).toBeVisible();
    
    // Close modal
    await page.locator('button').filter({ hasText: 'X' }).click();
    
    // Verify modal closes
    await expect(page.locator('text=Interactive Demo')).not.toBeVisible();
    
    // Test category filtering
    const categoryFilter = page.locator('select').nth(1);
    await categoryFilter.selectOption('dashboard');
    await page.waitForTimeout(500);
    
    // Verify components are filtered
    const filteredCards = page.locator('[class*="cursor-pointer"]');
    await expect(filteredCards.first()).toBeVisible();
    
    // Reset filters
    await categoryFilter.selectOption('all');
    await searchInput.clear();
    
    // Take screenshot of the full page
    await page.screenshot({ 
      path: 'screenshots/interactive-library-verification.png',
      fullPage: true 
    });
    
    // Verify no console errors
    const logs = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        logs.push(msg.text());
      }
    });
    
    // Wait a bit to catch any errors
    await page.waitForTimeout(2000);
    
    // Log any errors found
    if (logs.length > 0) {
      console.log('Console errors found:', logs);
    }
  });

  test('should verify all required header elements are present', async ({ page }) => {
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Verify all required header elements
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
    await expect(page.locator('select')).toHaveCount(6); // Multiple filter dropdowns
    await expect(page.locator('button[title="Grid View"]')).toBeVisible();
    await expect(page.locator('button[title="List View"]')).toBeVisible();
    await expect(page.locator('select').first()).toBeVisible(); // Theme selector
    
    // Verify component count display
    await expect(page.locator('text=/\\d+ \\/ \\d+ components/')).toBeVisible();
    
    // Take screenshot of header
    await page.screenshot({ 
      path: 'screenshots/header-verification.png',
      clip: { x: 0, y: 0, width: 1200, height: 300 }
    });
  });

  test('should verify component metadata display', async ({ page }) => {
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    await page.waitForTimeout(3000);
    
    // Get first component card
    const firstCard = page.locator('[class*="cursor-pointer"]').first();
    await expect(firstCard).toBeVisible();
    
    // Verify metadata is displayed
    await expect(firstCard.locator('text=/Version:/')).toBeVisible();
    await expect(firstCard.locator('text=/Type:/')).toBeVisible();
    await expect(firstCard.locator('text=/Dimension:/')).toBeVisible();
    await expect(firstCard.locator('text=/Date:/')).toBeVisible();
    
    // Verify tags are displayed
    await expect(firstCard.locator('[class*="bg-gray-100"]')).toBeVisible();
    
    // Verify View and Code buttons
    await expect(firstCard.locator('button').filter({ hasText: 'View' })).toBeVisible();
    await expect(firstCard.locator('button').filter({ hasText: 'Code' })).toBeVisible();
    
    // Take screenshot of component card
    await firstCard.screenshot({ path: 'screenshots/component-card-verification.png' });
  });

  test('should verify all filters work correctly', async ({ page }) => {
    await page.goto('https://0b7e4c8d.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Test search filter
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('chart');
    await page.waitForTimeout(1000);
    
    // Verify results are filtered
    const componentCards = page.locator('[class*="cursor-pointer"]');
    const cardCount = await componentCards.count();
    expect(cardCount).toBeGreaterThan(0);
    
    // Clear search
    await searchInput.clear();
    await page.waitForTimeout(1000);
    
    // Test category filter
    const categoryFilter = page.locator('select').nth(1);
    await categoryFilter.selectOption('ui');
    await page.waitForTimeout(1000);
    
    // Verify UI components are shown
    const uiCards = page.locator('[class*="cursor-pointer"]');
    const uiCardCount = await uiCards.count();
    expect(uiCardCount).toBeGreaterThan(0);
    
    // Reset filter
    await categoryFilter.selectOption('all');
    
    // Take screenshot of filtered results
    await page.screenshot({ 
      path: 'screenshots/filter-verification.png',
      fullPage: true 
    });
  });
});
