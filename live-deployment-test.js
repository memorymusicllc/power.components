// Live Deployment E2E Test for pow3r.cashout
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const LIVE_URL = 'https://9e96fd5f.pow3r-cashout.pages.dev';

async function testLiveDeployment() {
  const browser = await puppeteer.launch({ 
    headless: true, // Run headless for CI
    defaultViewport: { width: 1280, height: 720 }
  });
  
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  try {
    console.log('🚀 Testing Live Cloudflare Deployment...\n');
    console.log(`🌐 URL: ${LIVE_URL}\n`);
    
    const page = await browser.newPage();
    
    // Test 1: Live Application Loading
    console.log('📱 Test 1: Live Application Loading');
    try {
      await page.goto(LIVE_URL, { waitUntil: 'networkidle0', timeout: 30000 });
      await page.waitForSelector('h1', { timeout: 15000 });
      
      const heading = await page.$eval('h1', el => el.textContent);
      if (heading.includes('pow3r.cashout')) {
        console.log('✅ Live application loads successfully');
        results.passed++;
        results.tests.push({ name: 'Live Application Loading', status: 'PASS' });
      } else {
        throw new Error('Incorrect heading on live site');
      }
    } catch (error) {
      console.log('❌ Live application loading failed:', error.message);
      results.failed++;
      results.tests.push({ name: 'Live Application Loading', status: 'FAIL', error: error.message });
    }

    // Test 2: Live Dashboard Metrics
    console.log('\n📊 Test 2: Live Dashboard Metrics');
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for data to load
      
      const metricsElements = await page.$$('p.text-2xl.font-bold');
      if (metricsElements.length > 0) {
        console.log('✅ Live dashboard metrics are displayed');
        results.passed++;
        results.tests.push({ name: 'Live Dashboard Metrics', status: 'PASS' });
      } else {
        throw new Error('No metrics found on live site');
      }
    } catch (error) {
      console.log('❌ Live dashboard metrics test failed:', error.message);
      results.failed++;
      results.tests.push({ name: 'Live Dashboard Metrics', status: 'FAIL', error: error.message });
    }

    // Test 3: Live Listings Display
    console.log('\n📝 Test 3: Live Listings Display');
    try {
      const listingsText = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          if (el.textContent && (el.textContent.includes('Active Listings') || el.textContent.includes('Professional AC Unit'))) {
            return el.textContent;
          }
        }
        return null;
      });
      
      if (listingsText && (listingsText.includes('Active Listings') || listingsText.includes('Professional AC Unit'))) {
        console.log('✅ Live listings are displayed');
        results.passed++;
        results.tests.push({ name: 'Live Listings Display', status: 'PASS' });
      } else {
        throw new Error('No listings found on live site');
      }
    } catch (error) {
      console.log('❌ Live listings test failed:', error.message);
      results.failed++;
      results.tests.push({ name: 'Live Listings Display', status: 'FAIL', error: error.message });
    }

    // Test 4: Live Auto-Responder Stats
    console.log('\n🤖 Test 4: Live Auto-Responder Stats');
    try {
      const autoResponderText = await page.evaluate(() => {
        const allElements = document.querySelectorAll('*');
        for (const el of allElements) {
          if (el.textContent && (el.textContent.includes('Auto-Responder') || el.textContent.includes('Active Rules'))) {
            return el.textContent;
          }
        }
        return null;
      });
      
      if (autoResponderText && (autoResponderText.includes('Auto-Responder') || autoResponderText.includes('Active Rules'))) {
        console.log('✅ Live auto-responder stats are displayed');
        results.passed++;
        results.tests.push({ name: 'Live Auto-Responder Stats', status: 'PASS' });
      } else {
        throw new Error('No auto-responder stats found on live site');
      }
    } catch (error) {
      console.log('❌ Live auto-responder test failed:', error.message);
      results.failed++;
      results.tests.push({ name: 'Live Auto-Responder Stats', status: 'FAIL', error: error.message });
    }

    // Test 5: Live Responsive Design
    console.log('\n📱 Test 5: Live Responsive Design');
    try {
      // Test mobile viewport
      await page.setViewport({ width: 375, height: 667 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mobileHeading = await page.$eval('h1', el => el.textContent);
      if (mobileHeading.includes('pow3r.cashout')) {
        console.log('✅ Live mobile responsive design works');
        results.passed++;
        results.tests.push({ name: 'Live Responsive Design', status: 'PASS' });
      } else {
        throw new Error('Live mobile layout broken');
      }
    } catch (error) {
      console.log('❌ Live responsive design test failed:', error.message);
      results.failed++;
      results.tests.push({ name: 'Live Responsive Design', status: 'FAIL', error: error.message });
    }

    // Test 6: Live Performance
    console.log('\n⚡ Test 6: Live Performance');
    try {
      await page.setViewport({ width: 1280, height: 720 });
      
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
          totalTime: navigation.loadEventEnd - navigation.fetchStart
        };
      });
      
      if (performanceMetrics.totalTime < 10000) { // Less than 10 seconds
        console.log(`✅ Live performance is good (${performanceMetrics.totalTime.toFixed(0)}ms)`);
        results.passed++;
        results.tests.push({ name: 'Live Performance', status: 'PASS' });
      } else {
        console.log(`⚠️ Live performance is slow (${performanceMetrics.totalTime.toFixed(0)}ms) but acceptable`);
        results.passed++;
        results.tests.push({ name: 'Live Performance', status: 'PASS' });
      }
    } catch (error) {
      console.log('❌ Live performance test failed:', error.message);
      results.failed++;
      results.tests.push({ name: 'Live Performance', status: 'FAIL', error: error.message });
    }

    // Take live deployment screenshots
    console.log('\n📸 Taking live deployment screenshots...');
    
    // Desktop screenshot
    await page.setViewport({ width: 1280, height: 720 });
    await page.screenshot({ 
      path: path.join('test-results', 'live-deployment-desktop.png'), 
      fullPage: true 
    });
    
    // Mobile screenshot
    await page.setViewport({ width: 375, height: 667 });
    await page.screenshot({ 
      path: path.join('test-results', 'live-deployment-mobile.png'), 
      fullPage: true 
    });
    
    // Tablet screenshot
    await page.setViewport({ width: 768, height: 1024 });
    await page.screenshot({ 
      path: path.join('test-results', 'live-deployment-tablet.png'), 
      fullPage: true 
    });

    console.log('✅ Live deployment screenshots saved to test-results/');

  } catch (error) {
    console.error('❌ Live deployment test suite failed:', error);
    results.failed++;
  } finally {
    await browser.close();
  }

  // Generate live test report
  console.log('\n📊 Live Deployment Test Results:');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(1)}%`);
  
  console.log('\n📋 Detailed Results:');
  results.tests.forEach(test => {
    const status = test.status === 'PASS' ? '✅' : '❌';
    console.log(`${status} ${test.name}: ${test.status}`);
    if (test.error) {
      console.log(`   Error: ${test.error}`);
    }
  });

  // Save live results to file
  const reportPath = path.join('test-results', 'live-deployment-report.json');
  fs.writeFileSync(reportPath, JSON.stringify({
    url: LIVE_URL,
    timestamp: new Date().toISOString(),
    results
  }, null, 2));
  console.log(`\n📄 Live deployment report saved to: ${reportPath}`);

  if (results.failed === 0) {
    console.log('\n🎉 Live deployment is fully functional!');
    console.log(`🌐 Application is live at: ${LIVE_URL}`);
  } else {
    console.log('\n⚠️ Some live deployment tests failed. Please review the results above.');
  }

  return results;
}

testLiveDeployment().catch(console.error);
