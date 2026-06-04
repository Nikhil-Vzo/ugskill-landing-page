const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('Navigating to http://localhost:3000...');
  try {
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('Page loaded successfully.');
    
    // Capture screenshot
    await page.screenshot({ path: 'c:/Users/nikhi/Downloads/new landing page/public/screenshot-debug.png' });
    console.log('Screenshot saved to public/screenshot-debug.png');
  } catch (err) {
    console.error('Error loading page:', err);
  } finally {
    await browser.close();
  }
})();
