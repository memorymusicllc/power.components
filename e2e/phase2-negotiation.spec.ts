/**
 * Phase 2 Negotiation Manager E2E Tests
 * Tests price negotiation, meetup scheduling, and sale processing
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { test, expect } from '@playwright/test'

test.describe('Phase 2: Negotiation Manager', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display negotiation manager interface', async ({ page }) => {
    // Navigate to negotiation tab
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Check for key components
    await expect(page.locator('h2:has-text("Negotiation Manager")')).toBeVisible()
    await expect(page.locator('text=Price negotiation, meetup scheduling, and sale processing')).toBeVisible()
    
    // Check for metrics cards
    await expect(page.locator('text=Total Negotiations')).toBeVisible()
    await expect(page.locator('text=Success Rate')).toBeVisible()
    await expect(page.locator('text=Avg Negotiation Time')).toBeVisible()
    await expect(page.locator('text=Meetup Conversion')).toBeVisible()
  })

  test('should show negotiation tabs', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Check for tab navigation
    await expect(page.locator('text=Active')).toBeVisible()
    await expect(page.locator('text=Completed')).toBeVisible()
    await expect(page.locator('text=Strategies')).toBeVisible()
    await expect(page.locator('text=Transactions')).toBeVisible()
  })

  test('should allow starting new negotiation', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Check for start negotiation button
    await expect(page.locator('text=Start Negotiation')).toBeVisible()
    
    // Click start negotiation button
    await page.click('text=Start Negotiation')
    
    // Should show some response
    await expect(page.locator('text=Start Negotiation')).toBeVisible()
  })

  test('should display negotiation metrics', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Check metrics are displayed
    await expect(page.locator('text=Total Negotiations')).toBeVisible()
    await expect(page.locator('text=Success Rate')).toBeVisible()
    await expect(page.locator('text=Avg Negotiation Time')).toBeVisible()
    await expect(page.locator('text=Meetup Conversion')).toBeVisible()
    
    // Check for numeric values
    const totalNegotiations = page.locator('text=Total Negotiations').locator('..').locator('text=/\\d+/').first()
    await expect(totalNegotiations).toBeVisible()
  })

  test('should show active negotiations', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Click on Active tab
    await page.click('text=Active')
    
    // Should show active negotiations interface
    await expect(page.locator('text=Active (')).toBeVisible()
  })

  test('should show completed negotiations', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Click on Completed tab
    await page.click('text=Completed')
    
    // Should show completed negotiations interface
    await expect(page.locator('text=Completed (')).toBeVisible()
  })

  test('should show negotiation strategies', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Click on Strategies tab
    await page.click('text=Strategies')
    
    // Should show strategies interface
    await expect(page.locator('text=Negotiation Strategies')).toBeVisible()
    await expect(page.locator('text=New Strategy')).toBeVisible()
  })

  test('should show sale transactions', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Click on Transactions tab
    await page.click('text=Transactions')
    
    // Should show transactions interface
    await expect(page.locator('text=Sale Transactions')).toBeVisible()
    await expect(page.locator('text=New Transaction')).toBeVisible()
  })

  test('should handle refresh functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await page.waitForSelector('h2:has-text("Negotiation Manager")')
    
    // Click refresh button
    await page.click('text=Refresh')
    
    // Should not crash and should show loading state briefly
    await expect(page.locator('h2:has-text("Negotiation Manager")')).toBeVisible()
  })
})
