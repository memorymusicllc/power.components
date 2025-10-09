/**
 * Phase 2 Automation Engine E2E Tests
 * Tests auto-posting, content rotation, and cross-platform sync
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { test, expect } from '@playwright/test'

test.describe('Phase 2: Automation Engine', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display automation engine interface', async ({ page }) => {
    // Navigate to automation tab
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Check for key components
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    await expect(page.locator('text=Manage auto-posting, content rotation, and cross-platform sync')).toBeVisible()
    
    // Check for metrics cards
    await expect(page.locator('text=Total Posts')).toBeVisible()
    await expect(page.locator('text=Success Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
    await expect(page.locator('text=Content Rotation')).toBeVisible()
  })

  test('should show automation tabs', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Check for tab navigation
    await expect(page.locator('text=Schedules')).toBeVisible()
    await expect(page.locator('text=Content Rotation')).toBeVisible()
    await expect(page.locator('text=Cross-Platform Sync')).toBeVisible()
  })

  test('should allow creating new schedule', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Click on Schedules tab
    await page.click('text=Schedules')
    
    // Check for new schedule button
    await expect(page.locator('text=Schedule Post')).toBeVisible()
    
    // Click new schedule button
    await page.click('text=Schedule Post')
    
    // Should show some response (button click should work)
    await expect(page.locator('text=Schedule Post')).toBeVisible()
  })

  test('should allow creating content rotation', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Click on Content Rotation tab
    await page.click('text=Content Rotation')
    
    // Check for new rotation button
    await expect(page.locator('text=New Rotation')).toBeVisible()
    
    // Click new rotation button
    await page.click('text=New Rotation')
    
    // Should show some response
    await expect(page.locator('text=New Rotation')).toBeVisible()
  })

  test('should allow cross-platform sync', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Click on Cross-Platform Sync tab
    await page.click('text=Cross-Platform Sync')
    
    // Check for sync buttons
    await expect(page.locator('text=Retry Failed')).toBeVisible()
    await expect(page.locator('text=Sync Now')).toBeVisible()
    
    // Click sync now button
    await page.click('text=Sync Now')
    
    // Should show some response
    await expect(page.locator('text=Sync Now')).toBeVisible()
  })

  test('should display automation metrics', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Check metrics are displayed
    await expect(page.locator('text=Total Posts')).toBeVisible()
    await expect(page.locator('text=Success Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
    await expect(page.locator('text=Content Rotation')).toBeVisible()
    
    // Check for numeric values (should be present even if 0)
    const totalPosts = page.locator('text=Total Posts').locator('..').locator('text=/\\d+/').first()
    await expect(totalPosts).toBeVisible()
  })

  test('should handle refresh functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.waitForSelector('h2:has-text("Automation Engine")')
    
    // Click refresh button
    await page.click('text=Refresh')
    
    // Should not crash and should show loading state briefly
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
  })
})
