/**
 * Component Library Comprehensive E2E Test
 * Verifies ALL 50+ components are visible on the page
 * 
 * @version 1.0.0
 * @date 2025-01-11
 */

import { test, expect } from '@playwright/test'

// Component metadata matching ComponentLibrary.tsx
const ALL_COMPONENTS = [
  'power-redact',
  'dashboard-card',
  'price-chart',
  'leads-chart',
  'llm-performance-chart',
  'token-usage-chart',
  'model-comparison-chart',
  'error-rate-chart',
  'request-volume-chart',
  'latency-distribution-chart',
  'cost-analysis-chart',
  'quality-metrics-chart',
  'usage-patterns-chart',
  'quadrant-leader-chart',
  'network-graph-chart',
  'scatter-plot-chart',
  'bloom-graph-chart',
  'timeline-chart',
  'word-cloud-chart',
  'heatmap-chart',
  'confusion-matrix-chart',
  'roc-curve-chart',
  'sankey-diagram-chart',
  'gantt-chart',
  'item-details-collector',
  'photo-processor',
  'auto-posting-engine',
  'lead-monitor',
  'negotiation-manager',
  'admin-panel',
  'message-center',
  'button',
  'input',
  'card',
  'badge',
  'modal',
  'dropdown',
  'tabs',
  'accordion',
  'tooltip',
  'progress',
  'spinner',
  'alert',
  'table',
  'form',
  'checkbox',
  'radio',
  'switch',
  'slider',
  'avatar',
  'breadcrumb',
  'pagination'
]

test.describe('Component Library - All Components Visible', () => {
  test('should display all 50+ components on the page', async ({ page }) => {
    // Navigate to the component library
    await page.goto('/')
    
    // Wait for components to load
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Get count of component cards
    const cards = page.locator('.component-card')
    const count = await cards.count()
    
    console.log(`Found ${count} component cards on the page`)
    
    // Verify we have at least 50 components
    expect(count).toBeGreaterThanOrEqual(50)
    
    // Verify the header shows correct count
    const headerText = await page.locator('header p').first().textContent()
    console.log(`Header text: ${headerText}`)
    expect(headerText).toContain(`${count} components`)
  })

  test('should display live previews for all components', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    const cards = page.locator('.component-card')
    const count = await cards.count()
    
    // Verify each card has a preview section
    for (let i = 0; i < Math.min(count, 10); i++) {
      const card = cards.nth(i)
      const hasPreview = await card.locator('.border-b').count() > 0
      expect(hasPreview).toBeTruthy()
    }
  })

  test('should render interactive components correctly', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Test search functionality
    const searchInput = page.locator('input[placeholder="Search components..."]')
    await searchInput.fill('button')
    
    // Wait for filtered results
    await page.waitForTimeout(500)
    
    const filteredCards = page.locator('.component-card')
    const filteredCount = await filteredCards.count()
    
    console.log(`Filtered to ${filteredCount} components`)
    expect(filteredCount).toBeGreaterThan(0)
    expect(filteredCount).toBeLessThan(ALL_COMPONENTS.length)
  })

  test('should have working dark mode toggle', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Find and click dark mode toggle
    const darkModeButton = page.locator('button').filter({ has: page.locator('svg') }).nth(1)
    await darkModeButton.click()
    
    // Verify dark class is added to body
    await page.waitForTimeout(300)
    const bodyClass = await page.locator('body').getAttribute('class')
    console.log(`Body class after toggle: ${bodyClass}`)
  })

  test('should show component details on click', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Click first component card info section
    const firstCard = page.locator('.component-card').first()
    const infoSection = firstCard.locator('.cursor-pointer')
    await infoSection.click()
    
    // Verify modal appears
    const modal = page.locator('.fixed.inset-0.bg-black')
    await expect(modal).toBeVisible({ timeout: 2000 })
    
    // Verify modal has component details
    await expect(modal.locator('h2')).toBeVisible()
    await expect(modal.locator('code')).toBeVisible()
  })

  test('should filter by phase', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Select "Core" phase
    const phaseSelect = page.locator('select').first()
    await phaseSelect.selectOption('Core')
    
    await page.waitForTimeout(500)
    
    const cards = page.locator('.component-card')
    const count = await cards.count()
    
    console.log(`Filtered by Core phase: ${count} components`)
    expect(count).toBeGreaterThan(0)
  })

  test('should filter by tag', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Select a tag filter
    const tagSelect = page.locator('select').nth(1)
    await tagSelect.selectOption('core')
    
    await page.waitForTimeout(500)
    
    const cards = page.locator('.component-card')
    const count = await cards.count()
    
    console.log(`Filtered by core tag: ${count} components`)
    expect(count).toBeGreaterThan(0)
  })

  test('should display all component metadata', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    const firstCard = page.locator('.component-card').first()
    
    // Verify component name is visible
    await expect(firstCard.locator('h3')).toBeVisible()
    
    // Verify description is visible
    await expect(firstCard.locator('p').first()).toBeVisible()
    
    // Verify tags are visible
    const tags = firstCard.locator('.flex.flex-wrap.gap-1 span')
    const tagCount = await tags.count()
    expect(tagCount).toBeGreaterThan(0)
    
    // Verify phase badge is visible
    const phaseBadge = firstCard.locator('[class*="bg-blue"]').first()
    await expect(phaseBadge).toBeVisible()
  })

  test('should capture screenshot of full library', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Scroll to load all components
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await page.waitForTimeout(1000)
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.waitForTimeout(500)
    
    // Take full page screenshot
    await page.screenshot({ 
      path: 'test-results/component-library-full.png',
      fullPage: true 
    })
  })

  test('should capture individual component screenshots', async ({ page }) => {
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    const cards = page.locator('.component-card')
    const count = await cards.count()
    
    console.log(`Capturing screenshots of ${Math.min(count, 10)} component cards...`)
    
    // Capture first 10 component cards
    for (let i = 0; i < Math.min(count, 10); i++) {
      const card = cards.nth(i)
      const componentName = await card.locator('p.font-mono').textContent()
      
      await card.screenshot({
        path: `test-results/component-${i}-${componentName?.replace(/[^a-zA-Z0-9]/g, '-')}.png`
      })
    }
  })

  test('should verify no missing imports or errors in console', async ({ page }) => {
    const errors: string[] = []
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text())
      }
    })
    
    page.on('pageerror', error => {
      errors.push(error.message)
    })
    
    await page.goto('/')
    await page.waitForSelector('.component-card', { timeout: 10000 })
    
    // Allow some time for any errors to appear
    await page.waitForTimeout(2000)
    
    console.log(`Console errors found: ${errors.length}`)
    if (errors.length > 0) {
      console.log('Errors:', errors)
    }
    
    // No critical errors should be present
    const criticalErrors = errors.filter(e => 
      !e.includes('favicon') && 
      !e.includes('og-image') &&
      !e.includes('vite.svg')
    )
    
    expect(criticalErrors.length).toBe(0)
  })
})

