import path from 'path';
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
	globalSetup: path.resolve('./globalSetup.js'),
	use: {
		ignoreHTTPSErrors: true
	},
	webServer: {
		command: 'npm run dev -- --https',
		port: 3000
	}
};

export default config;
