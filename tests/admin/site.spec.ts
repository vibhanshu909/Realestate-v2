import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/admin/storageState.json' });

test.describe('Admin::Site Workflow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://localhost:4000');
		await page.locator('a[href="/admin/sites/1"]').click();
		expect(page.url().match('/admin/sites/*')).toBeTruthy();
	});

	test('Create Site', async ({ page }) => {
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
		await nameEl.fill('new site');
		expect(nameEl).toHaveValue('new site');

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
		expect(await siteEl.locator('td:nth-child(3)').textContent()).toBe('new site');
		expect(await siteEl.locator('td:nth-child(4)').textContent()).toBe('new site location');
		expect(await siteEl.locator('td:nth-child(5)').textContent()).toBe('0');
		expect(await siteEl.locator('td:nth-child(7)').textContent()).toBeTruthy();
		expect(await siteEl.locator('td:nth-child(8)').textContent()).toBe('0');
		expect(await siteEl.locator('td:nth-child(9)').textContent()).toBe('0');
	});

	test('View Site Detail', async ({ page }) => {
		expect(page.url().match('/admin/sites/*')).toBeTruthy();

		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.site-view');

		expect(page.url().match('/admin/site/detail/*')).toBeTruthy();

		expect(
			await page.locator('main > div.stats > div.stat:nth-child(1) > div.stat-value').textContent()
		).toBe('new site');
		expect(
			await page.locator('main > div.stats > div.stat:nth-child(2) > div.stat-value').textContent()
		).toBe('new site location');

		expect(await page.locator('main table.table').count()).toBe(2);

		const totalTable = page.locator('main table.table').first();
		expect(await totalTable.locator('tbody > tr').count()).toBe(2);
		expect(await totalTable.locator('tbody > tr:nth-child(1) > th').count()).toBe(22 + 1);
		expect(await totalTable.locator('tbody > tr:nth-child(2) > td').count()).toBe(22);
		expect(
			await totalTable.locator('tbody > tr:nth-child(2) > td').allTextContents()
		).toMatchObject([
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'0',
			'N/A',
			'0',
			'N/A',
			'0'
		]);

		// Site Entry Table
		const entryTable = page.locator('main table.table').last();
		expect(await entryTable.locator('tbody > tr').count()).toBe(1);
		expect(await entryTable.locator('tbody > tr > th').count()).toBe(22 + 1);
	});

	test('Edit Site', async ({ page }) => {
		expect(page.url().match('/admin/sites/*')).toBeTruthy();

		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.site-edit');

		// Wait for redirect

		expect(page.url().match('/admin/site/edit/*')).toBeTruthy();

		// Form
		const nameEl = page.locator('input#name');
		const locationEl = page.locator('input#location');

		const submitBtnEl = page.locator('button[type="submit"]');

		expect(nameEl).toBeVisible();
		expect(nameEl).toBeEnabled();

		expect(locationEl).toBeVisible();
		expect(locationEl).toBeEnabled();

		expect(submitBtnEl).toBeVisible();
		expect(submitBtnEl).toBeEnabled();

		// Filling data
		await nameEl.fill('new site edit');
		expect(nameEl).toHaveValue('new site edit');

		await locationEl.fill('new site location edit');
		expect(locationEl).toHaveValue('new site location edit');

		// Submit Form
		await submitBtnEl.click();
		expect(page.url().match('/admin/sites/*')).toBeTruthy();
		// Check if site is created
		const siteEl = page.locator('main table > tbody > tr:nth-child(1)');
		expect(await siteEl.locator('td:nth-child(3)').textContent()).toBe('new site edit');
		expect(await siteEl.locator('td:nth-child(4)').textContent()).toBe('new site location edit');
		expect(await siteEl.locator('td:nth-child(5)').textContent()).toBe('0');
		expect(await siteEl.locator('td:nth-child(7)').textContent()).toBeTruthy();
		expect(await siteEl.locator('td:nth-child(8)').textContent()).toBe('0');
		expect(await siteEl.locator('td:nth-child(9)').textContent()).toBe('0');
	});

	test('Delete Site', async ({ page }) => {
		expect(page.url().match('/admin/sites/*')).toBeTruthy();

		await page.click('main table > tbody > tr:nth-child(1) > th.actions');

		await page.click('a.site-delete');
		// Wait for redirect

		// Check if site is deleted
		const siteEl = page.locator('main table > tbody > tr:nth-child(1)');
		// Username
		expect(await siteEl.locator('td:nth-child(3)').textContent()).not.toBe('new site edit');
	});
});
