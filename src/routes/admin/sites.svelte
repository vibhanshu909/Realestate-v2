<script context="module" lang="ts">
	import Layout from '$lib/admin/layout.svelte';
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

<Layout>
	<Sites {sites} />
	<a
		id="create-site"
		href="/admin/site/create"
		class="btn btn-primary btn-circle btn-lg fixed bottom-12 right-0 mr-2"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
		>
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
		</svg>
	</a>
</Layout>
