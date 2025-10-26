import { test, expect } from '@playwright/test';

test.describe('Debug Component Rendering', () => {
  test('should debug what components are actually rendering', async ({ page }) => {
    await page.goto('https://7a709aab.power-components.pages.dev');
    await page.waitForLoadState('networkidle');
    
    // Enable console logging
    page.on('console', msg => {
      if (msg.type() === 'log') {
        console.log(`🔍 CONSOLE: ${msg.text()}`);
      }
    });
    
    // Get all component cards
    const componentCards = page.locator('[class*="rounded-lg"].border');
    const cardCount = await componentCards.count();
    console.log(`📊 Total component cards: ${cardCount}`);
    
    // Check first 10 components
    for (let i = 0; i < Math.min(10, cardCount); i++) {
      const card = componentCards.nth(i);
      const title = await card.locator('h3').first().textContent();
      const category = await card.locator('.category-badge').textContent();
      
      console.log(`📋 Component ${i + 1}: ${title} (${category})`);
      
      // Check what's inside the component
      const svgElements = card.locator('svg');
      const svgCount = await svgElements.count();
      console.log(`   - SVG elements: ${svgCount}`);
      
      const buttonElements = card.locator('button');
      const buttonCount = await buttonElements.count();
      console.log(`   - Button elements: ${buttonCount}`);
      
      const inputElements = card.locator('input');
      const inputCount = await inputElements.count();
      console.log(`   - Input elements: ${inputCount}`);
      
      const tableElements = card.locator('table');
      const tableCount = await tableElements.count();
      console.log(`   - Table elements: ${tableCount}`);
      
      // Get the component content area
      const contentArea = card.locator('div').nth(1); // The component rendering area
      const contentText = await contentArea.textContent();
      console.log(`   - Content preview: ${contentText?.substring(0, 100)}...`);
    }
    
    // Check for all SVG elements on the page
    const allSvgs = page.locator('svg');
    const allSvgCount = await allSvgs.count();
    console.log(`🎨 Total SVG elements on page: ${allSvgCount}`);
    
    // Check for all buttons
    const allButtons = page.locator('button');
    const allButtonCount = await allButtons.count();
    console.log(`🔘 Total buttons on page: ${allButtonCount}`);
    
    // Check for all inputs
    const allInputs = page.locator('input');
    const allInputCount = await allInputs.count();
    console.log(`📝 Total inputs on page: ${allInputCount}`);
    
    // Check for all tables
    const allTables = page.locator('table');
    const allTableCount = await allTables.count();
    console.log(`📊 Total tables on page: ${allTableCount}`);
    
    // Take a screenshot
    await page.screenshot({ 
      path: 'screenshots/debug-component-rendering.png',
      fullPage: true 
    });
    
    console.log(`✅ DEBUG COMPLETE:`);
    console.log(`   - Component cards: ${cardCount}`);
    console.log(`   - SVG elements: ${allSvgCount}`);
    console.log(`   - Buttons: ${allButtonCount}`);
    console.log(`   - Inputs: ${allInputCount}`);
    console.log(`   - Tables: ${allTableCount}`);
  });
});
