<script context="module" lang="ts">
	import Sites from '$lib/admin/sites.svelte';
	import type { Site } from '@prisma/client';
</script>

<script lang="ts">
	export let sites: (Site & {
		manager: {
			username: string;
		};
		_count: {
			siteEntries: number;
		};
	})[];
</script>

<Sites {sites} />
