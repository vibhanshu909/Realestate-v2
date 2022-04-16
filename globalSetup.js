import { chromium, expect } from '@playwright/test';

/**
 * @param {import('@playwright/test').Page} page
 * @param {{username: string, password: string}} credential
 */
const loginFn = async (page, credential) => {
	const { username, password } = credential;
	await page.goto('https://localhost:4000');

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
const createManager = async (page) => {
	await page.click('main a#create-manager');

	expect(page.url()).toContain('/admin/manager/create');

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
	await usernameEl.fill('temp_manager');
	expect(usernameEl).toHaveValue('temp_manager');

	await passwordEl.fill('temp@123');
	expect(passwordEl).toHaveValue('temp@123');

	await totalReceivedAmountEl.fill('0');
	expect(totalReceivedAmountEl).toHaveValue('0');

	await contactEl.fill('0');
	expect(contactEl).toHaveValue('0');

	// Submit Form
	await submitBtnEl.click();

	// Wait for redirect

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
const createSite = async (page) => {
	await page.goto('https://localhost:4000/admin/sites/1');
	expect(page.url().match('/admin/sites/*')).toBeTruthy();

	await page.click('a#create-site');

	expect(page.url().endsWith('/admin/site/create')).toBe(true);

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

	expect(page.url().endsWith('/admin/sites/1')).toBe(true);

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
	const managerPage = await browser.newPage();
	await createManager(adminPage);
	await createSite(adminPage);
	await loginFn(managerPage, { username: 'temp_manager', password: 'temp@123' });
	await managerPage.context().storageState({ path: 'tests/manager/storageState.json' });
	await browser.close();
}

export default globalSetup;
