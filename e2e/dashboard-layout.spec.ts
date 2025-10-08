/**
 * Dashboard Layout Tests
 * Tests the 2x2 grid layout and card wrapping
 */

import { test, expect } from '@playwright/test'

test.describe('Dashboard Layout', () => {
  test('should have proper 2x2 grid layout on desktop', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the dashboard to load
    await page.waitForSelector('[data-testid="dashboard-grid"], .grid', { timeout: 10000 })
    
    // Check that we have a 2-column grid on medium screens and up
    const grid = page.locator('.grid')
    await expect(grid).toHaveClass(/grid-cols-1 md:grid-cols-2/)
    
    // Verify we have the expected number of cards
    const cards = page.locator('[class*="DashboardCard"], .card, [class*="grid"] > div')
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThanOrEqual(4) // At least 4 cards for 2x2 layout
  })

  test('should have cards that fit properly in 2x2 grid', async ({ page }) => {
    await page.goto('/')
    
    // Wait for content to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Check that cards have proper column spans
    const cards = page.locator('.grid > div')
    const cardCount = await cards.count()
    
    // First row should have 2 cards (1 column each)
    const firstRowCards = cards.nth(0)
    const secondRowCards = cards.nth(1)
    
    // Check that cards are properly sized
    const firstCardBox = await firstRowCards.boundingBox()
    const secondCardBox = await secondRowCards.boundingBox()
    
    if (firstCardBox && secondCardBox) {
      // Cards should be roughly the same width (within 50px tolerance)
      expect(Math.abs(firstCardBox.width - secondCardBox.width)).toBeLessThan(50)
    }
  })

  test('should be responsive and stack on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Wait for content
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // On mobile, cards should stack vertically
    const grid = page.locator('.grid')
    await expect(grid).toHaveClass(/grid-cols-1/)
  })

  test('should have proper card heights for dashboard layout', async ({ page }) => {
    await page.goto('/')
    
    // Wait for content
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Check that cards have proper height classes
    const cards = page.locator('.grid > div')
    const firstCard = cards.first()
    
    // Cards should have flex layout for proper height
    const cardClasses = await firstCard.getAttribute('class')
    expect(cardClasses).toContain('h-full')
  })

  test('should display all dashboard widgets in proper layout', async ({ page }) => {
    await page.goto('/')
    
    // Wait for content
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Check for key dashboard elements
    await expect(page.getByText('Price History')).toBeVisible()
    await expect(page.getByText('Lead Pipeline')).toBeVisible()
    await expect(page.getByText("Today's Activity")).toBeVisible()
    await expect(page.getByText('Active Listings')).toBeVisible()
    await expect(page.getByText('Auto-Responder System')).toBeVisible()
    
    // Verify that the dashboard has the expected structure
    const mainGrid = page.locator('.grid').first()
    await expect(mainGrid).toBeVisible()
    
    // Check that we have cards in the main grid
    const cards = mainGrid.locator('> div')
    await expect(cards).toHaveCount(5) // 4 cards in 2x2 + 1 full-width card
  })
})
