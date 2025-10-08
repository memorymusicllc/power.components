/**
 * Universal Search Tests
 * Comprehensive tests for the advanced search functionality
 */

import { test, expect } from '@playwright/test'

test.describe('Universal Search', () => {
  test('should display search input with placeholder', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Check that search input is visible
    await expect(page.getByPlaceholder('Search listings, leads, metrics, and more...')).toBeVisible()
  })

  test('should show search suggestions on input', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await searchInput.fill('listing')
    
    // Wait for suggestions to appear
    await page.waitForTimeout(500)
    
    // Check that suggestions are visible
    await expect(page.locator('[class*="suggestions"]')).toBeVisible()
  })

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await searchInput.fill('test')
    
    // Wait for suggestions
    await page.waitForTimeout(500)
    
    // Test arrow key navigation
    await searchInput.press('ArrowDown')
    await searchInput.press('ArrowUp')
    await searchInput.press('Escape')
    
    // Search input should still be focused
    await expect(searchInput).toBeFocused()
  })

  test('should show search results', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await searchInput.fill('dashboard')
    
    // Press Enter to search
    await searchInput.press('Enter')
    
    // Wait for results
    await page.waitForTimeout(1000)
    
    // Check that results are shown
    const resultsText = page.locator('text=/result/i')
    await expect(resultsText).toBeVisible()
  })

  test('should support filter chips', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await searchInput.fill('category:listings')
    
    // Wait for filter to be applied
    await page.waitForTimeout(500)
    
    // Check that filter chips are visible
    const filterChips = page.locator('[class*="filter"]')
    await expect(filterChips).toBeVisible()
  })

  test('should show advanced search options', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Click on settings/advanced button
    const settingsButton = page.locator('[title="Advanced Search"]')
    await settingsButton.click()
    
    // Check that advanced search panel is visible
    await expect(page.getByText('Advanced Search')).toBeVisible()
    await expect(page.getByText('Logic Builder')).toBeVisible()
    await expect(page.getByText('Logic Operators')).toBeVisible()
  })

  test('should support logic operators', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Open advanced search
    const settingsButton = page.locator('[title="Advanced Search"]')
    await settingsButton.click()
    
    // Check that logic operators are visible
    await expect(page.getByText('AND')).toBeVisible()
    await expect(page.getByText('OR')).toBeVisible()
    await expect(page.getByText('NOT')).toBeVisible()
    await expect(page.getByText('XOR')).toBeVisible()
  })

  test('should show search history', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Open advanced search
    const settingsButton = page.locator('[title="Advanced Search"]')
    await settingsButton.click()
    
    // Check that search history section is visible
    await expect(page.getByText('Recent Searches')).toBeVisible()
  })

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Check that search input is still visible and functional
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await expect(searchInput).toBeVisible()
    
    // Test mobile search
    await searchInput.fill('test')
    await searchInput.press('Enter')
    
    // Wait for results
    await page.waitForTimeout(1000)
  })

  test('should clear search when clear button is clicked', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await searchInput.fill('test search')
    
    // Click clear button
    const clearButton = page.locator('[class*="clear"]')
    await clearButton.click()
    
    // Check that search input is empty
    await expect(searchInput).toHaveValue('')
  })

  test('should show loading state during search', async ({ page }) => {
    await page.goto('/')
    
    // Wait for the page to load
    await page.waitForSelector('h1', { timeout: 10000 })
    
    // Type in search box
    const searchInput = page.getByPlaceholder('Search listings, leads, metrics, and more...')
    await searchInput.fill('complex search query')
    
    // Check that loading indicator appears
    const loadingIndicator = page.locator('[class*="animate-spin"]')
    await expect(loadingIndicator).toBeVisible()
  })
})
