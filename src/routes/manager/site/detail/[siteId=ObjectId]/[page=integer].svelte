<script lang="ts">
	import Detail from '$lib/site/detail.svelte';
	import type { Site, SiteEntry, User } from '@prisma/client';

	export let site: Site & {
		manager: User;
	};
	export let entries: SiteEntry[];
	export let totalEntries: number;

	export let pageCount: number;
	export let page: number;
</script>

<Detail
	routePrefix="/manager"
	{page}
	{pageCount}
	{site}
	{entries}
	{totalEntries}
	redirect={`/manager/site/detail/${site.id}/1`}
/>
