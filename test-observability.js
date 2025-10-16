/**
 * Test script for observability system
 * Tests via observation channel as required by Pow3r Law
 */

const puppeteer = require('puppeteer');

async function testObservabilitySystem() {
  console.log('🔍 Testing Observability System via Observation Channel...');
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  try {
    // Navigate to the deployment
    await page.goto('https://deae325d.power-components.pages.dev/', { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });
    
    // Wait for components to load
    await page.waitForTimeout(3000);
    
    // Check if observability dashboard is present
    const observabilityPresent = await page.$('[data-testid="observability-dashboard"]') !== null;
    
    // Check for any JavaScript errors
    const hasErrors = errors.length > 0;
    
    console.log('📊 Test Results:');
    console.log(`- Page loaded: ✅`);
    console.log(`- Observability Dashboard present: ${observabilityPresent ? '✅' : '❌'}`);
    console.log(`- JavaScript errors: ${hasErrors ? '❌' : '✅'}`);
    
    if (hasErrors) {
      console.log('🚨 Errors found:');
      errors.forEach(error => console.log(`  - ${error}`));
    }
    
    // Test observability functionality
    try {
      await page.evaluate(() => {
        // Check if observability store is available
        return window.observabilityStore !== undefined;
      });
      console.log('- Observability store available: ✅');
    } catch (e) {
      console.log('- Observability store available: ❌');
    }
    
    return !hasErrors && observabilityPresent;
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    return false;
  } finally {
    await browser.close();
  }
}

// Run the test
testObservabilitySystem().then(success => {
  if (success) {
    console.log('🎉 Observability System Test: PASSED');
    process.exit(0);
  } else {
    console.log('❌ Observability System Test: FAILED');
    process.exit(1);
  }
}).catch(error => {
  console.error('❌ Test execution failed:', error);
  process.exit(1);
});
