<script lang="ts">
	import { session } from '$app/stores';
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

<Navbar user={$session} />
<div class="pt-20">
	<div class="btn-group">
		<a href="/" class="btn btn-active">Users</a>
		<a href="/sites" class="btn">Sites</a>
	</div>
	<Users {users} />
	<Sites {sites} />
</div>
