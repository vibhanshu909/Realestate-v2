import { chromium, expect, type Page } from '@playwright/test';

const loginFn = async (page: Page, credential: { username: string; password: string }) => {
	const { username, password } = credential;
	await page.goto('https://localhost:4000');
	await page.waitForSelector('input#username');
	const usernameEl = page.locator('input#username');
	const passwordEl = page.locator('input#password');
	const submitBtnEl = page.locator('button[type="submit"]');

	await expect(usernameEl).toBeEnabled();
	await expect(usernameEl).toBeVisible();
	await expect(usernameEl).toHaveValue('');

	await expect(passwordEl).toBeEnabled();
	await expect(passwordEl).toBeVisible();
	await expect(passwordEl).toHaveValue('');

	await expect(submitBtnEl).toBeEnabled();
	await expect(submitBtnEl).toBeVisible();
	await expect(submitBtnEl).toHaveText('Login');

	await usernameEl.fill(username);
	await expect(usernameEl).toHaveValue(username);

	await passwordEl.fill(password);
	await expect(passwordEl).toHaveValue(password);

	// Submit form
	await submitBtnEl.click();
};

const createManager = async (
	page: Page,
	manager: {
		username: string;
		password: string;
	}
) => {
	await page.click('main a#create-manager');

	await page.waitForSelector('input#username');

	// Form
	const usernameEl = page.locator('input#username');
	const passwordEl = page.locator('input#password');
	const totalReceivedAmountEl = page.locator('input#totalReceivedAmount');
	const contactEl = page.locator('input#contact');
	const submitBtnEl = page.locator('button[type="submit"]');

	expect(usernameEl).toBeVisible();
	expect(usernameEl).toBeEnabled();

	expect(passwordEl).toBeVisible();
	expect(passwordEl).toBeEnabled();

	expect(totalReceivedAmountEl).toBeVisible();
	expect(totalReceivedAmountEl).toBeEnabled();

	expect(contactEl).toBeVisible();
	expect(contactEl).toBeEnabled();

	expect(submitBtnEl).toBeVisible();
	expect(submitBtnEl).toBeEnabled();

	// Filling data
	await usernameEl.fill(manager.username);
	expect(usernameEl).toHaveValue(manager.username);

	await passwordEl.fill(manager.password);
	expect(passwordEl).toHaveValue(manager.password);

	await totalReceivedAmountEl.fill('0');
	expect(totalReceivedAmountEl).toHaveValue('0');

	await contactEl.fill('0');
	expect(contactEl).toHaveValue('0');

	// Submit Form
	await submitBtnEl.click();

	// Wait for redirect
	await page.waitForSelector('main table tbody tr:nth-child(1)');
	expect(page.url()).toContain('/admin');

	// Check if manager is created
	const managerEl = page.locator('main table tbody tr:nth-child(1)');
	// Username
	expect(await managerEl.locator('td:nth-child(3)').textContent()).toBe('temp_manager');
	// Phone Number
	expect(await managerEl.locator('td:nth-child(4)').textContent()).toBe('0');
	// Total Received Amount
	expect(await managerEl.locator('td:nth-child(7)').textContent()).toBe('0');
	// Spent Amount
	expect(await managerEl.locator('td:nth-child(8)').textContent()).toBe('0');

	// Balance
	expect(await managerEl.locator('td:nth-child(9)').textContent()).toBe('0');
};

const createSite = async (
	page: Page,
	manager: {
		username: string;
		password: string;
	}
) => {
	await page.goto('https://localhost:4000/admin/sites/1');

	await page.waitForSelector('a#create-site');
	await page.click('a#create-site');

	await page.waitForSelector('input#name');
	// Form
	const nameEl = page.locator('input#name');
	const locationEl = page.locator('input#location');
	const managerIdEl = page.locator('select#managerId');
	const createdAtEl = page.locator('input#createdAt');

	const submitBtnEl = page.locator('button[type="submit"]');

	expect(nameEl).toBeVisible();
	expect(nameEl).toBeEnabled();

	expect(locationEl).toBeVisible();
	expect(locationEl).toBeEnabled();

	expect(managerIdEl).toBeVisible();
	expect(managerIdEl).toBeEnabled();

	expect(createdAtEl).toBeVisible();
	expect(createdAtEl).toBeEnabled();

	expect(submitBtnEl).toBeVisible();
	expect(submitBtnEl).toBeEnabled();

	// Filling data
	await nameEl.fill('new_site');
	expect(nameEl).toHaveValue('new_site');

	await locationEl.fill('new site location');
	expect(locationEl).toHaveValue('new site location');

	await managerIdEl.click();
	await page.keyboard.press('ArrowDown');
	await page.keyboard.press('Enter');
	expect(await managerIdEl.inputValue()).toBeTruthy();

	await createdAtEl.fill('2022-01-01');
	expect(createdAtEl).toHaveValue('2022-01-01');

	// Submit Form
	await submitBtnEl.click();

	// Wait for redirect
	await page.waitForSelector('main table > tbody > tr:nth-child(1)');

	// Check if site is created
	const siteEl = page.locator('main table > tbody > tr:nth-child(1)');
	expect(await siteEl.locator('td:nth-child(3)').textContent()).toBe('new_site');
	expect(await siteEl.locator('td:nth-child(4)').textContent()).toBe('new site location');
	expect(await siteEl.locator('td:nth-child(5)').textContent()).toBe('0');
	expect(await siteEl.locator('td:nth-child(7)').textContent()).toBeTruthy();
	expect(await siteEl.locator('td:nth-child(8)').textContent()).toBe('0');
	expect(await siteEl.locator('td:nth-child(9)').textContent()).toBe('0');
};

async function globalSetup() {
	const browser = await chromium.launch({
		args: ['--ignore-certificate-errors', '--disable-web-security']
	});
	const adminPage = await browser.newPage();
	await loginFn(adminPage, { username: 'admin', password: 'admin@123' });
	await adminPage.context().storageState({ path: 'tests/admin/storageState.json' });

	// Manager Page Login setup
	const manager = { username: 'temp_manager', password: 'temp@123' };

	await createManager(adminPage, manager);
	await createSite(adminPage, manager);
	const managerPage = await (await browser.newContext()).newPage();
	await loginFn(managerPage, manager);
	await managerPage.context().storageState({ path: 'tests/manager/storageState.json' });
	await browser.close();
}

export default globalSetup;
