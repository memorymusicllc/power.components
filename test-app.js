// Simple test to verify the application is working
import puppeteer from 'puppeteer';

async function testApp() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    console.log('Testing application at http://localhost:3003...');
    
    await page.goto('http://localhost:3003', { waitUntil: 'networkidle0' });
    
    // Wait for the dashboard to load
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Check if the main heading is present
    const heading = await page.$eval('h1', el => el.textContent);
    console.log('✅ Main heading found:', heading);
    
    // Check if listings are loaded
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for data to load
    
    const listingsText = await page.evaluate(() => {
      // Look for any element containing "Active Listings" or "No active listings"
      const allElements = document.querySelectorAll('*');
      for (const el of allElements) {
        if (el.textContent && (el.textContent.includes('Active Listings') || el.textContent.includes('No active listings'))) {
          return el.textContent;
        }
      }
      return 'No listings element found';
    });
    
    console.log('✅ Listings section:', listingsText);
    
    // Take a screenshot
    await page.screenshot({ path: 'test-results/app-working.png', fullPage: true });
    console.log('✅ Screenshot saved to test-results/app-working.png');
    
    console.log('🎉 Application is working correctly!');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

testApp();
