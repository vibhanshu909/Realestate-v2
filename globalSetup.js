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

async function globalSetup() {
	const browser = await chromium.launch({
		args: ['--ignore-certificate-errors', '--disable-web-security']
	});
	const adminPage = await browser.newPage();
	await loginFn(adminPage, { username: 'admin', password: 'admin@123' });
	await adminPage.context().storageState({ path: 'tests/admin/storageState.json' });

	// Manager Page Login setup
	const managerPage = await browser.newPage();
	await loginFn(managerPage, { username: 'akhilesh', password: 'admin@123' });
	await managerPage.context().storageState({ path: 'tests/manager/storageState.json' });
	await browser.close();
}

export default globalSetup;
