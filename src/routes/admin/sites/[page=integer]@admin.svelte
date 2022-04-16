<script context="module" lang="ts">
	import SiteActionModals from '$lib/admin/SiteActionModals.svelte';
	import SiteTableHeader from '$lib/admin/SiteTableHeader.svelte';
	import formatDate from '$lib/date';
	import ModalButton from '$lib/ModalButton.svelte';
	import { toCurrency } from '$lib/toCurrency';
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

	export let pageCount: number;
	export let page: number;
</script>

<div class="overflow-x-auto">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<SiteTableHeader />
		</thead>
		<tbody>
			{#each sites as site (site.id)}
				{@const {
					createdAt,
					updatedAt,
					name,
					location,
					_count: { siteEntries: totalEntries },
					manager: { username },
					managerSpentAmount,
					cost
				} = site}
				<tr>
					<th class="actions bg-base-100 p-0">
						<ModalButton htmlFor={site.id} />
					</th>
					<td>{formatDate(createdAt)}</td>
					<td>{name}</td>
					<td>{location}</td>
					<td>{totalEntries}</td>
					<td>{formatDate(updatedAt)}</td>
					<td class="text-accent">{username}</td>
					<td class="text-accent">{toCurrency(managerSpentAmount)}</td>
					<td>{toCurrency(cost)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<SiteTableHeader />
		</tfoot>
	</table>
</div>

{#if pageCount > 1}
	<div class="flex items-center justify-center py-5">
		<div class="btn-group flex justify-center gap-y-1">
			{#each new Array(pageCount).fill(0) as _, i}
				{@const p = i + 1}
				<a href={`/admin/sites/${p}`} class="btn" class:btn-active={p === page}>{p}</a>
			{/each}
		</div>
	</div>
{/if}

{#each sites as site (site.id)}
	<SiteActionModals {site} {page} />
{/each}
<a
	id="create-site"
	href="/admin/site/create"
	class="btn btn-circle btn-primary btn-lg fixed bottom-12 right-0 mr-2"
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
