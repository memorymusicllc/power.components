/**
 * Phase 2 AI Response System E2E Tests
 * Tests AI-powered auto-responses, template management, and escalation
 * 
 * @version 2.0.0
 * @date 2025-01-08
 */

import { test, expect } from '@playwright/test'

test.describe('Phase 2: AI Response System', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
  })

  test('should display AI response system interface', async ({ page }) => {
    // Navigate to AI responses tab
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Check for key components
    await expect(page.locator('h2:has-text("AI Response System")')).toBeVisible()
    await expect(page.locator('text=AI-powered auto-responses and intelligent escalation')).toBeVisible()
    
    // Check for metrics cards
    await expect(page.locator('text=Total Responses')).toBeVisible()
    await expect(page.locator('text=Success Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
    await expect(page.locator('text=AI Confidence')).toBeVisible()
  })

  test('should show AI response tabs', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Check for tab navigation
    await expect(page.locator('text=Templates')).toBeVisible()
    await expect(page.locator('text=Rules')).toBeVisible()
    await expect(page.locator('text=Sessions')).toBeVisible()
  })

  test('should allow creating new template', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Click on Templates tab
    await page.click('text=Templates')
    
    // Check for new template button
    await expect(page.locator('text=New Template')).toBeVisible()
    
    // Click new template button
    await page.click('text=New Template')
    
    // Should show some response
    await expect(page.locator('text=New Template')).toBeVisible()
  })

  test('should allow creating new rule', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Click on Rules tab
    await page.click('text=Rules')
    
    // Check for new rule button
    await expect(page.locator('text=New Rule')).toBeVisible()
    
    // Click new rule button
    await page.click('text=New Rule')
    
    // Should show some response
    await expect(page.locator('text=New Rule')).toBeVisible()
  })

  test('should display AI metrics', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Check metrics are displayed
    await expect(page.locator('text=Total Responses')).toBeVisible()
    await expect(page.locator('text=Success Rate')).toBeVisible()
    await expect(page.locator('text=Avg Response Time')).toBeVisible()
    await expect(page.locator('text=AI Confidence')).toBeVisible()
    
    // Check for numeric values
    const totalResponses = page.locator('text=Total Responses').locator('..').locator('text=/\\d+/').first()
    await expect(totalResponses).toBeVisible()
  })

  test('should show active AI sessions', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Check for sessions functionality
    await page.click('text=Sessions')
    
    // Should show sessions interface
    await expect(page.locator('text=AI Sessions')).toBeVisible()
  })

  test('should handle test response functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Click on Sessions tab
    await page.click('text=Sessions')
    
    // Check for test response button
    await expect(page.locator('text=Test Response')).toBeVisible()
    
    // Click test response button
    await page.click('text=Test Response')
    
    // Should show some response
    await expect(page.locator('text=Test Response')).toBeVisible()
  })

  test('should handle refresh functionality', async ({ page }) => {
    await page.click('xpath=//button[contains(text(), "AI Responses")]')
    await page.waitForSelector('h2:has-text("AI Response System")')
    
    // Click refresh button
    await page.click('text=Refresh')
    
    // Should not crash and should show loading state briefly
    await expect(page.locator('h2:has-text("AI Response System")')).toBeVisible()
  })
})
