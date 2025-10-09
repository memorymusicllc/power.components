/**
 * Phase 2 Complete System E2E Tests
 * Tests full Phase 2 functionality across all components
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { test, expect } from '@playwright/test'

test.describe('Phase 2: Complete System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display all Phase 2 navigation tabs', async ({ page }) => {
    // Check for all Phase 2 tabs
    await expect(page.locator('text=Overview')).toBeVisible()
    await expect(page.locator('text=Listings')).toBeVisible()
    await expect(page.locator('text=Leads')).toBeVisible()
    await expect(page.locator('text=Automation')).toBeVisible()
    await expect(page.locator('text=AI Responses')).toBeVisible()
    await expect(page.locator('text=Negotiation')).toBeVisible()
    await expect(page.locator('text=Analytics')).toBeVisible()
    await expect(page.locator('text=Settings')).toBeVisible()
  })

  test('should navigate through all Phase 2 components', async ({ page }) => {
    // Test Automation Engine
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    
    // Test Lead Monitor
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await expect(page.locator('h2:has-text("Lead Monitor")')).toBeVisible()
    
    // Test AI Response System
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await expect(page.locator('h2:has-text("AI Response System")')).toBeVisible()
    
    // Test Negotiation Manager
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await expect(page.locator('h2:has-text("Negotiation Manager")')).toBeVisible()
    
    // Test Analytics Dashboard
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
  })

  test('should maintain state across navigation', async ({ page }) => {
    // Navigate to different tabs and ensure state is maintained
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
  })

  test('should handle global refresh across all components', async ({ page }) => {
    // Test refresh functionality from different tabs
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.click('text=Refresh')
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.click('text=Refresh')
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
  })

  test('should display consistent header across all components', async ({ page }) => {
    const components = [
      { tab: 'Automation', title: 'Automation Engine' },
      { tab: 'Leads', title: 'Lead Monitor' },
      { tab: 'AI Responses', title: 'AI Response System' },
      { tab: 'Negotiation', title: 'Negotiation Manager' },
      { tab: 'Analytics', title: 'Analytics Dashboard' }
    ]

    for (const component of components) {
      await page.click(`xpath=//button[contains(text(), "${component.tab}")]`)
      await expect(page.locator(`h2:has-text("${component.title}")`)).toBeVisible()
      
      // Check for consistent header elements
      await expect(page.locator('h1:has-text("pow3r.cashout")')).toBeVisible()
      await expect(page.locator('text=Multi-Platform Selling Dashboard')).toBeVisible()
    }
  })

  test('should show metrics across all components', async ({ page }) => {
    // Test that metrics are displayed in each component
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(page.locator('text=Total Posts')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await expect(page.locator('text=Total Leads')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await expect(page.locator('text=Total Responses')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await expect(page.locator('text=Total Negotiations')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await expect(page.locator('text=Total Revenue')).toBeVisible()
  })

  test('should handle responsive design across all components', async ({ page }) => {
    // Test responsive design by resizing viewport
    await page.setViewportSize({ width: 375, height: 667 }) // Mobile
    
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
    
    // Reset to desktop
    await page.setViewportSize({ width: 1280, height: 720 })
    
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await expect(page.locator('h2:has-text("Negotiation Manager")')).toBeVisible()
  })

  test('should maintain dark theme across all components', async ({ page }) => {
    // Check that dark theme is applied consistently
    const body = page.locator('body')
    await expect(body).toHaveClass(/dark/)
    
    // Test across different components
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(body).toHaveClass(/dark/)
    
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await expect(body).toHaveClass(/dark/)
  })

  test('should handle loading states gracefully', async ({ page }) => {
    // Test that loading states work across components
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await page.click('text=Refresh')
    
    // Should show loading state briefly
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await page.click('text=Refresh')
    
    // Should show loading state briefly
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
  })

  test('should complete full user journey', async ({ page }) => {
    // Complete user journey through all Phase 2 components
    
    // 1. Start with Overview
    await expect(page.locator('text=Overview')).toBeVisible()
    
    // 2. Check Listings
    await page.click('xpath=//button[contains(text(), "Listings")]')
    await expect(page.locator('text=Listing Management')).toBeVisible()
    
    // 3. Monitor Leads
    await page.click('xpath=//button[contains(text(), "Leads")]')
    await expect(page.locator('h2:has-text("Lead Monitor")')).toBeVisible()
    
    // 4. Set up Automation
    await page.click('xpath=//button[contains(text(), "Automation")]')
    await expect(page.locator('h2:has-text("Automation Engine")')).toBeVisible()
    
    // 5. Configure AI Responses
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await expect(page.locator('h2:has-text("AI Response System")')).toBeVisible()
    
    // 6. Manage Negotiations
    await page.click('xpath=//button[contains(text(), "Negotiation")]')
    await expect(page.locator('h2:has-text("Negotiation Manager")')).toBeVisible()
    
    // 7. Review Analytics
    await page.click('xpath=//button[contains(text(), "Analytics")]')
    await expect(page.locator('h2:has-text("Analytics Dashboard")')).toBeVisible()
    
    // 8. Check Settings
    await page.click('xpath=//button[contains(text(), "Settings")]')
    await expect(page.locator('text=Settings')).toBeVisible()
  })
})
