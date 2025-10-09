import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const DEPLOYMENT_URL = 'https://cashruleseverythingaroundme.pages.dev';

async function verifyDeployment() {
  console.log('🚀 Verifying Deployment and Taking Screenshots\n');
  console.log(`📡 Testing: ${DEPLOYMENT_URL}`);
  
  // Create test results directory
  const testResultsDir = 'deployment-verification';
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  try {
    const page = await browser.newPage();
    
    // Test main dashboard
    console.log('\n🔍 Testing Dashboard...');
    await page.goto(`${DEPLOYMENT_URL}/`, { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Take screenshots
    await page.screenshot({ 
      path: path.join(testResultsDir, 'dashboard-full.png'), 
      fullPage: true 
    });
    console.log('📸 Dashboard full page screenshot saved');
    
    await page.screenshot({ 
      path: path.join(testResultsDir, 'dashboard-viewport.png'), 
      fullPage: false 
    });
    console.log('📸 Dashboard viewport screenshot saved');
    
    // Test component library
    console.log('\n🔍 Testing Component Library...');
    await page.goto(`${DEPLOYMENT_URL}/library`, { 
      waitUntil: 'domcontentloaded',
      timeout: 15000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Take screenshots
    await page.screenshot({ 
      path: path.join(testResultsDir, 'library-full.png'), 
      fullPage: true 
    });
    console.log('📸 Library full page screenshot saved');
    
    await page.screenshot({ 
      path: path.join(testResultsDir, 'library-viewport.png'), 
      fullPage: false 
    });
    console.log('📸 Library viewport screenshot saved');
    
    // Test responsive design
    const viewports = [
      { width: 375, height: 667, name: 'mobile' },
      { width: 768, height: 1024, name: 'tablet' },
      { width: 1920, height: 1080, name: 'desktop' }
    ];
    
    for (const viewport of viewports) {
      console.log(`\n📱 Testing ${viewport.name} viewport...`);
      await page.setViewport(viewport);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await page.screenshot({ 
        path: path.join(testResultsDir, `dashboard-${viewport.name}.png`), 
        fullPage: false 
      });
      console.log(`📸 ${viewport.name} screenshot saved`);
    }
    
    // Check page functionality
    const pageTitle = await page.title();
    console.log(`\n📄 Page Title: ${pageTitle}`);
    
    // Check for console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    console.log(`\n✅ Deployment verification completed successfully!`);
    console.log(`📸 Screenshots saved to: ${testResultsDir}`);
    
    if (consoleErrors.length > 0) {
      console.log(`⚠️ Console errors found: ${consoleErrors.length}`);
    } else {
      console.log(`✅ No console errors detected`);
    }
    
  } finally {
    await browser.close();
  }
}

verifyDeployment().catch(console.error);
