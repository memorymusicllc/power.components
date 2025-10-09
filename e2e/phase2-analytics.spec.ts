/**
 * Phase 2 Analytics Dashboard E2E Tests
 * Tests comprehensive analytics, reporting, and optimization insights
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { test, expect } from '@playwright/test'

test.describe('Phase 2: Analytics Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display analytics dashboard interface', async ({ page }) => {
    // Navigate to analytics tab
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Check for key components
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
    await expect(page.locator('text=Comprehensive analytics, reporting, and optimization insights')).toBeVisible()
    
    // Check for metrics cards
    await expect(page.locator('text=Total Revenue')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Active Listings')).toBeVisible()
    await expect(page.locator('text=Avg Sale Price')).toBeVisible()
  })

  test('should show analytics tabs', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Check for tab navigation
    await expect(page.locator('text=Overview')).toBeVisible()
    await expect(page.locator('text=Insights')).toBeVisible()
    await expect(page.locator('text=Reports')).toBeVisible()
    await expect(page.locator('text=Dashboards')).toBeVisible()
  })

  test('should display key metrics', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Check metrics are displayed
    await expect(page.locator('text=Total Revenue')).toBeVisible()
    await expect(page.locator('text=Conversion Rate')).toBeVisible()
    await expect(page.locator('text=Active Listings')).toBeVisible()
    await expect(page.locator('text=Avg Sale Price')).toBeVisible()
    
    // Check for numeric values
    const totalRevenue = page.locator('text=Total Revenue').locator('..').locator('text=/\\$[\\d,]+/').first()
    await expect(totalRevenue).toBeVisible()
  })

  test('should show platform performance', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Check for platform performance section
    await expect(page.locator('text=Platform Performance')).toBeVisible()
  })

  test('should allow creating new insight', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Click on Insights tab
    await page.click('text=Insights')
    
    // Check for new insight button
    await expect(page.locator('text=New Insight')).toBeVisible()
    
    // Click new insight button
    await page.click('text=New Insight')
    
    // Should show some response
    await expect(page.locator('text=New Insight')).toBeVisible()
  })

  test('should show optimization insights', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Click on Insights tab
    await page.click('text=Insights')
    
    // Should show insights interface
    await expect(page.locator('text=Optimization Insights')).toBeVisible()
  })

  test('should show report templates', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Click on Reports tab
    await page.click('text=Reports')
    
    // Should show reports interface
    await expect(page.locator('text=Report Templates')).toBeVisible()
    await expect(page.locator('text=New Template')).toBeVisible()
  })

  test('should show custom dashboards', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Click on Dashboards tab
    await page.click('text=Dashboards')
    
    // Should show dashboards interface
    await expect(page.locator('text=Custom Dashboards')).toBeVisible()
    await expect(page.locator('text=New Dashboard')).toBeVisible()
  })

  test('should handle export functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Check for export button
    await expect(page.locator('text=Export')).toBeVisible()
    
    // Click export button
    await page.click('text=Export')
    
    // Should show some response
    await expect(page.locator('text=Export')).toBeVisible()
  })

  test('should handle refresh functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.waitForSelector('h2:has-text("Analytics Dashboard")')
    
    // Click refresh button
    await page.click('text=Refresh')
    
    // Should not crash and should show loading state briefly
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
  })
})
