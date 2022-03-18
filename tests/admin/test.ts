import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/admin/storageState.json' });

test('Admin Login', async ({ page }) => {
	await page.goto('https://localhost:3000');
	expect(page.url()).toContain('/admin');
});
