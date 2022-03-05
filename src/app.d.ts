/// <reference types="@sveltejs/kit" />

import type { User } from '@prisma/client';

// See https://kit.svelte.dev/docs/typescript
// for information about these interfaces
declare namespace App {
	interface Locals {
		user?: Omit<User, 'password'>;
	}

	interface Platform {
		// Note: Placeholder
		placeholder: string;
	}

	interface Session {
		id: string;
		username: string;
		isAdmin: boolean;
	}

	interface Stuff {
		// Note: Placeholder
		placeholder: string;
	}
}
