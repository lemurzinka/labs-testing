const puppeteer = require('puppeteer');

describe('DemoBlaze UI Tests (Лабораторна №5)', () => {
  
  jest.setTimeout(40000);

  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
  });

  afterAll(async () => {
    await browser.close();
  });

  test('1. Checking the loading of the main page', async () => {
    await page.goto('https://www.demoblaze.com/');
    const title = await page.title();
    expect(title).toBe('STORE');
  });

  test('2. The main page displays 9 products', async () => {
    await page.goto('https://www.demoblaze.com/');
    await page.waitForSelector('.card', { timeout: 15000 });
    const products = await page.$$('.card');
    expect(products.length).toBe(9);
  });

  test('3. Opening the first product detail page', async () => {
    await page.goto('https://www.demoblaze.com/');
    await page.waitForSelector('.card', { timeout: 15000 });
    await page.click('.card .card-title a');
    await page.waitForSelector('h2.name', { timeout: 10000 });
    const productTitle = await page.$eval('h2.name', el => el.textContent);
    expect(productTitle.length).toBeGreaterThan(0);
  });

  test('4.Adding a product to the cart', async () => {
    await page.goto('https://www.demoblaze.com/');
    await page.waitForSelector('.card', { timeout: 15000 });
    await page.click('.card .card-title a');
    await page.waitForSelector('h2.name', { timeout: 10000 });
    
   
    await page.waitForSelector('a.btn.btn-success.btn-lg', { timeout: 10000 });
    await page.click('a.btn.btn-success.btn-lg');

   
    await new Promise(resolve => setTimeout(resolve, 2000));
  });

  test('5. Go to cart and check the added product', async () => {
    await page.goto('https://www.demoblaze.com/');
    await page.waitForSelector('.card', { timeout: 15000 });
    await page.click('.card .card-title a');
    await page.waitForSelector('h2.name', { timeout: 10000 });
    
    await page.waitForSelector('a.btn.btn-success.btn-lg', { timeout: 10000 });
    await page.click('a.btn.btn-success.btn-lg');
    
    await page.click('#cartur');
    await page.waitForSelector('.success', { timeout: 15000 });
    
    const itemInCart = await page.$eval('.success td:nth-child(2)', el => el.textContent);
    expect(itemInCart.length).toBeGreaterThan(0);
  });
});
