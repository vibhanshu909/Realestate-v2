import { expect, test } from '@playwright/test';

test.use({ storageState: 'tests/manager/storageState.json' });

test('Manager Login', async ({ page }) => {
	await page.goto('https://localhost:4000');
	expect(page.url()).toContain('/manager');
});
