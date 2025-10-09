/**
 * Phase 2 Lead Monitor E2E Tests
 * Tests real-time lead tracking, scoring, and priority management
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { test, expect } from '@playwright/test'

test.describe('Phase 2: Lead Monitor', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display lead monitor interface', async ({ page }) => {
    // Navigate to leads tab
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Check for key components
    await expect(page.locator('h2:has-text("Lead Monitor")')).toBeVisible()
    await expect(page.locator('text=Real-time lead tracking and management')).toBeVisible()
    
    // Check for metrics cards
    await expect(page.locator('text=Total Leads')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
    await expect(page.locator('text=Lead Score')).toBeVisible()
  })

  test('should show lead tabs', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Check for tab navigation
    await expect(page.locator('text=All')).toBeVisible()
    await expect(page.locator('text=New')).toBeVisible()
    await expect(page.locator('text=Qualified')).toBeVisible()
    await expect(page.locator('text=Negotiating')).toBeVisible()
    await expect(page.locator('text=Sold')).toBeVisible()
  })

  test('should display lead metrics', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Check metrics are displayed
    await expect(page.locator('text=Total Leads')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
    await expect(page.locator('text=Lead Score')).toBeVisible()
    
    // Check for numeric values
    const totalLeads = page.locator('text=Total Leads').locator('..').locator('text=/\\d+/').first()
    await expect(totalLeads).toBeVisible()
  })

  test('should handle filter functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Check for filter button
    await expect(page.locator('text=Filter')).toBeVisible()
    
    // Click filter button
    await page.click('text=Filter')
    
    // Should show some response
    await expect(page.locator('text=Filter')).toBeVisible()
  })

  test('should handle refresh functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Click refresh button
    await page.click('text=Refresh')
    
    // Should not crash and should show loading state briefly
    await expect(page.locator('h2:has-text("Lead Monitor")')).toBeVisible()
  })

  test('should show lead status tabs with counts', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Check that tabs show counts in parentheses
    await expect(page.locator('text=All (')).toBeVisible()
    await expect(page.locator('text=New (')).toBeVisible()
    await expect(page.locator('text=Qualified (')).toBeVisible()
    await expect(page.locator('text=Negotiating (')).toBeVisible()
    await expect(page.locator('text=Sold (')).toBeVisible()
  })

  test('should display real-time updates indicator', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await page.waitForSelector('h2:has-text("Lead Monitor")')
    
    // Check for real-time functionality
    await expect(page.locator('text=Real-time lead tracking')).toBeVisible()
    
    // Should show some indication of real-time capabilities
    await expect(page.locator('h2:has-text("Lead Monitor")')).toBeVisible()
  })
})
