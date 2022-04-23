import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/manager/storageState.json' });

test.describe('Manager Workflow', () => {
	test.beforeEach(async ({ page }) => {
		await page.goto('https://localhost:4000/manager', { waitUntil: 'networkidle' });
		expect(page.url()).toContain('/manager');
	});

	test('Delete Manager', async ({ page }) => {
		await page.click('main table > tbody > tr:nth-child(2) > th.actions');

		await page.click('a.manager-delete');
		expect(page.locator('a.delete-action-yes').first()).toBeVisible();
		await page.click('a.delete-action-yes');
		// Wait for redirect

		await page.waitForSelector('main table > tbody > tr:nth-child(2)');

		// Check if manager is deleted
		const managerEl = page.locator('main table > tbody > tr:nth-child(2)');
		// Username
		expect(await managerEl.locator('td:nth-child(3)').textContent()).not.toBe('temp_manager');
	});
});
