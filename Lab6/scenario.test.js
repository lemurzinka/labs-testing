const puppeteer = require('puppeteer');

describe('DemoBlaze UI Tests (Lab6)', () => {
  
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

  // Сценарій 1: Користувач бачить товари на головній сторінці
  test('User sees products on main page', async () => {
    await page.goto('https://www.demoblaze.com/');
    await page.waitForSelector('.card');
    const products = await page.$$('.card');
    expect(products.length).toBe(9);
  });

// Сценарій 2: Користувач додає товар у кошик
test('User adds product to cart', async () => {
  await page.goto('https://www.demoblaze.com/');
  await page.waitForSelector('.card', { timeout: 10000 });
  await page.waitForSelector('.card .card-title a', { timeout: 10000 });
  await page.click('.card .card-title a');
  await page.waitForSelector('a.btn.btn-success.btn-lg', { timeout: 10000 });
  await page.click('a.btn.btn-success.btn-lg');
  await new Promise(resolve => setTimeout(resolve, 2000)); 
});

// Сценарій 3: Користувач перевіряє наявність товару у кошику
test('User checks product in cart', async () => {
  await page.goto('https://www.demoblaze.com/');
  await page.waitForSelector('.card', { timeout: 10000 });
  await page.waitForSelector('.card .card-title a', { timeout: 10000 });
  await page.click('.card .card-title a');

  await page.waitForSelector('a.btn.btn-success.btn-lg', { timeout: 10000 });

  page.on('dialog', async dialog => {
    await dialog.accept();
  });
  await page.click('a.btn.btn-success.btn-lg');
  await page.waitForSelector('#cartur', { timeout: 10000 });
  await page.click('#cartur');
  await page.waitForSelector('.success', { timeout: 10000 });
  const itemInCart = await page.$eval('.success td:nth-child(2)', el => el.textContent);
  expect(itemInCart.length).toBeGreaterThan(0);
});

});
