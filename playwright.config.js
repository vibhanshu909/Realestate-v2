import path from 'path';
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	globalSetup: path.resolve('./globalSetup.js'),
	use: {
		ignoreHTTPSErrors: true,
		launchOptions: {
			slowMo: 100
		}
	},
	webServer: {
		command: 'npm run dev -- --https',
		// command: 'npm run build && npm run preview',
		port: 3000
	}
};

export default config;
