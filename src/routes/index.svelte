<script lang="ts">
	import Sites from '$lib/admin/sites.svelte';
	import Users from '$lib/admin/users.svelte';
	import Navbar from '$lib/Navbar.svelte';
	import type { Site, User } from '@prisma/client';

	export let users: (User & {
		_count: {
			sites: number;
		};
		totalSitesCost: BigInt;
	})[];
	export let sites: (Site & {
		manager: {
			username: string;
		};
		_count: {
			siteEntries: number;
		};
	})[];
</script>

<Navbar user={{ isAdmin: true }} />
<div class="pt-20">
	<Users {users} />
	<Sites {sites} />
</div>
