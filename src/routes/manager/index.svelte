<script lang="ts">
	import SiteActionModals from '$lib/manager/SiteActionModals.svelte';
	import ManagerSites from '$lib/manager/sites/index.svelte';
	import type { Site, User } from '@prisma/client';
	export let user: Omit<User, 'password'>;
	export let siteCount: number;
	export let sites: (Site & {
		_count: {
			siteEntries: number;
		};
	})[];

	export let pageCount: number;
	export let page: number;
</script>

<ManagerSites {user} {siteCount} {sites} {pageCount} {page} let:site>
	<SiteActionModals {site} />
</ManagerSites>
