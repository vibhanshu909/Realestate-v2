import type { PlaywrightTestConfig } from '@playwright/test';
import path from 'path';

const config: PlaywrightTestConfig = {
	globalSetup: path.resolve('src/globalSetup.ts'),
	use: {
		ignoreHTTPSErrors: true,
		launchOptions: {
			slowMo: 1000
		}
	},
	webServer: {
		command: 'npm run dev -- --https --port 4000',
		port: 4000
	}
};

export default config;
