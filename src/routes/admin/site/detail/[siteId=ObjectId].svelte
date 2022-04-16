<script lang="ts">
	import Detail from '$lib/site/detail.svelte';
	import type { Site, SiteEntry, User } from '@prisma/client';

	export let site: Site & {
		manager: User;
	};
	export let entries: SiteEntry[];
	export let totalEntries: number;
</script>

<Detail {site} {entries} {totalEntries} redirect="" />
