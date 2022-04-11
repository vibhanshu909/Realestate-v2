import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/admin/storageState.json' });

test.describe('Admin', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://localhost:3000');
		expect(page.url()).toContain('/admin');
	});

	test('Create Manager', async ({ page }) => {
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
		await usernameEl.fill('temp');
		expect(usernameEl).toHaveValue('temp');

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
		expect(await managerEl.locator('td:nth-child(3)').textContent()).toBe('temp');
		// Phone Number
		expect(await managerEl.locator('td:nth-child(4)').textContent()).toBe('0');
		// Total Received Amount
		expect(await managerEl.locator('td:nth-child(7)').textContent()).toBe('0');
		// Spent Amount
		expect(await managerEl.locator('td:nth-child(8)').textContent()).toBe('0');

		// Balance
		expect(await managerEl.locator('td:nth-child(9)').textContent()).toBe('0');
	});

	test('Credit Manager', async ({ page }) => {
		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.manager-credit');

		expect(page.url()).toContain('/admin/manager/credit/');

		// Form
		const amountEl = page.locator('input#amount');
		const noteEl = page.locator('input#note');

		const submitBtnEl = page.locator('button[type="submit"]');

		expect(amountEl).toBeVisible();
		expect(amountEl).toBeEnabled();

		expect(noteEl).toBeVisible();
		expect(noteEl).toBeEnabled();

		expect(submitBtnEl).toBeVisible();
		expect(submitBtnEl).toBeEnabled();

		// Filling data
		await amountEl.fill('100');
		expect(amountEl).toHaveValue('100');

		await noteEl.fill('Initial Credit');
		expect(noteEl).toHaveValue('Initial Credit');

		// Submit Form
		await submitBtnEl.click();

		// Wait for redirect

		expect(page.url()).toContain('/admin');

		// Check if manager is credited
		const managerEl = page.locator('main table > tbody > tr:nth-child(1)');
		// Total Received Amount
		expect(await managerEl.locator('td:nth-child(7)').textContent()).toBe('100');
		// Spent Amount
		expect(await managerEl.locator('td:nth-child(8)').textContent()).toBe('0');
		// Balance
		expect(await managerEl.locator('td:nth-child(9)').textContent()).toBe('100');
	});

	test('Uncredited Manager', async ({ page }) => {
		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.manager-credit');

		expect(page.url()).toContain('/admin/manager/credit/');

		// Form
		const amountEl = page.locator('input#amount');
		const noteEl = page.locator('input#note');

		const submitBtnEl = page.locator('button[type="submit"]');

		expect(amountEl).toBeVisible();
		expect(amountEl).toBeEnabled();

		expect(noteEl).toBeVisible();
		expect(noteEl).toBeEnabled();

		expect(submitBtnEl).toBeVisible();
		expect(submitBtnEl).toBeEnabled();

		// Filling data
		await amountEl.fill('-100');
		expect(amountEl).toHaveValue('-100');

		await noteEl.fill('Uncredited Initial Credit');
		expect(noteEl).toHaveValue('Uncredited Initial Credit');

		// Submit Form
		await submitBtnEl.click();

		// Wait for redirect

		expect(page.url()).toContain('/admin');

		// Check if manager is credited
		const managerEl = page.locator('main table > tbody > tr:nth-child(1)');
		// Total Received Amount
		expect(await managerEl.locator('td:nth-child(7)').textContent()).toBe('0');
		// Spent Amount
		expect(await managerEl.locator('td:nth-child(8)').textContent()).toBe('0');
		// Balance
		expect(await managerEl.locator('td:nth-child(9)').textContent()).toBe('0');
	});

	test('Manager History', async ({ page }) => {
		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.manager-history');

		// Wait for redirect

		expect(page.url()).toContain('/admin/manager/transaction/');

		const historyEl = page.locator('main table > tbody > tr:nth-child(1)');
		// Total Received Amount
		expect(await historyEl.locator('td:nth-child(3)').textContent()).toBe('-100');
		// Spent Amount
		expect(await historyEl.locator('td:nth-child(4)').textContent()).toBe('CREDIT');
		// Balance
		expect(await historyEl.locator('td:nth-child(5)').textContent()).toBe('0');
		// Note
		expect(await historyEl.locator('td:nth-child(6)').textContent()).toBe(
			'Uncredited Initial Credit'
		);

		// Last Transaction History
		const historyEl2 = page.locator('main table > tbody > tr:nth-child(2)');
		// Total Received Amount
		expect(await historyEl2.locator('td:nth-child(3)').textContent()).toBe('100');
		// Spent Amount
		expect(await historyEl2.locator('td:nth-child(4)').textContent()).toBe('CREDIT');
		// Balance
		expect(await historyEl2.locator('td:nth-child(5)').textContent()).toBe('100');
		// Note
		expect(await historyEl2.locator('td:nth-child(6)').textContent()).toBe('Initial Credit');
	});

	test('Edit Manager', async ({ page }) => {
		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.manager-edit');

		expect(page.url()).toContain('/admin/manager/edit/');

		// Form
		const usernameEl = page.locator('input#username');
		const submitBtnEl = page.locator('button[type="submit"]');

		expect(usernameEl).toBeVisible();
		expect(usernameEl).toBeEnabled();

		expect(submitBtnEl).toBeVisible();
		expect(submitBtnEl).toBeEnabled();

		// Filling data
		await usernameEl.fill('temp0');
		expect(usernameEl).toHaveValue('temp0');

		// Submit Form
		await submitBtnEl.click();

		// Wait for redirect

		expect(page.url()).toContain('/admin');

		// Check if manager username is updated
		expect(
			await page.locator('main table > tbody > tr:nth-child(1) > td:nth-child(3)').textContent()
		).toBe('temp0');
	});

	test('Delete Manager', async ({ page }) => {
		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.manager-delete');
		// Wait for redirect

		expect(page.url()).toContain('/admin');

		// Check if manager is deleted
		const managerEl = page.locator('main table > tbody > tr:nth-child(1)');
		// Username
		expect(await managerEl.locator('td:nth-child(3)').textContent()).not.toBe('temp0');
	});
});
