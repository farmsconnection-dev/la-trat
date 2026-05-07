const puppeteer = require('puppeteer-core');
const fs = require('fs/promises');

(async () => {
  const executablePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const userDataDir = 'C:\\Users\\Gebruiker\\AppData\\Local\\Google\\Chrome\\User Data';

  try {
    const browser = await puppeteer.launch({
      executablePath,
      userDataDir,
      headless: false,
    });

    const page = (await browser.pages())[0];
    await page.goto('https://www.facebook.com/trattoriatrium', { waitUntil: 'networkidle2' });

    // Scroll down to load more images
    for (let i = 0; i < 5; i++) {
        await page.evaluate(() => window.scrollBy(0, window.innerHeight));
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const images = await page.evaluate(() => {
       return Array.from(document.querySelectorAll('img'))
         .filter(img => img.width > 200 && img.height > 200) // Skip icons
         .map(img => img.src);
    });

    await fs.writeFile('social-output.json', JSON.stringify([...new Set(images)], null, 2));
    
    console.log(`Successfully scraped ${images.length} images.`);
    await browser.close();

  } catch (err) {
    console.error("Scraping failed:", err);
  }
})();
