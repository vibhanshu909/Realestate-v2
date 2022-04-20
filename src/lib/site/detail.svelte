<script lang="ts">
	import { session } from '$app/stores';
	import { kconstants } from '$lib/kconstants';
	import Pagination from '$lib/Pagination.svelte';
	import { toCurrency } from '$lib/toCurrency';
	import type { Site, SiteEntry, User } from '@prisma/client';
	import SiteDetailTableHeader from './SiteDetailTableHeader.svelte';

	export let site: Site & {
		manager: User;
	};
	export let entries: SiteEntry[];
	export let totalEntries: number;
	export let redirect: string;
	const { mistri, labour, eit, morang, baalu, githi, cement, saria, dust, other, other2 } =
		site.total;

	export let routePrefix: string;
	export let pageCount: number;
	export let page: number;
</script>

<div
	class="stats mx-1 my-2 grid grid-flow-row grid-cols-2 grid-rows-2 shadow ring-2 md:grid-cols-4 md:grid-rows-1"
>
	<div class="stat">
		<div class="stat-title">Name</div>
		<div class="stat-value whitespace-normal -lg:text-base">
			{site.name}
		</div>
	</div>
	<div class="stat">
		<div class="stat-title">Location</div>
		<div class="stat-value -lg:text-base">{site.location}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Total Cost ({kconstants.currencySymbol})</div>
		<div class="stat-value -lg:text-base">{toCurrency(site.cost)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Total Entry</div>
		<div class={`stat-value -lg:text-base`}>
			{totalEntries}
		</div>
	</div>
	<div class="stat">
		<div class="stat-title">Manager</div>
		<div class={`stat-value -lg:text-base`}>
			{site.manager.username}
		</div>
	</div>
	<div class="stat">
		<div class="stat-title">Manager Spent Amount ({kconstants.currencySymbol})</div>
		<div class={`stat-value -lg:text-base`}>
			{toCurrency(site.managerSpentAmount)}
		</div>
	</div>
</div>

<!-- Total Table -->
<div class="my-5 overflow-x-auto">
	<table class="table-compact table w-full">
		<thead>
			<SiteDetailTableHeader totalTable={true} />
		</thead>
		<tbody>
			<tr>
				<th />
				{#each new Array(9) as _}
					<th>Quantity</th>
					<th>Price({kconstants.currencySymbol})</th>
				{/each}
			</tr>
			<tr>
				<th />
				<td>{mistri.quantity}</td>
				<td>{toCurrency(mistri.cost)}</td>
				<td>{labour.quantity}</td>
				<td>{toCurrency(labour.cost)}</td>
				<td>{eit.quantity}</td>
				<td>{toCurrency(eit.cost)}</td>
				<td>{morang.quantity}</td>
				<td>{toCurrency(morang.cost)}</td>
				<td>{baalu.quantity}</td>
				<td>{toCurrency(baalu.cost)}</td>
				<td>{githi.quantity}</td>
				<td>{toCurrency(githi.cost)}</td>
				<td>{cement.quantity}</td>
				<td>{toCurrency(cement.cost)}</td>
				<td>{saria.quantity}</td>
				<td>{toCurrency(saria.cost)}</td>
				<td>{dust.quantity}</td>
				<td>{toCurrency(dust.cost)}</td>
				<td>{toCurrency(other)}</td>
				<td>{toCurrency(other2)}</td>
				<td class="!bg-accent !text-accent-content">{toCurrency(site.managerSpentAmount)}</td>
				<td>{toCurrency(site.cost)}</td>
			</tr>
		</tbody>
		<tfoot>
			<SiteDetailTableHeader totalTable={true} />
		</tfoot>
	</table>
</div>

<!-- Entries Table -->
<div class="overflow-x-auto">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<SiteDetailTableHeader />
		</thead>
		<tbody>
			<tr>
				<th />
				{#each new Array(11) as _}
					<th>Quantity</th>
					<th>Price({kconstants.currencySymbol})</th>
				{/each}
			</tr>
			{#each entries as entry, index}
				{@const { mistri, labour, eit, morang, baalu, githi, cement, saria, dust, other, other2 } =
					entry}
				{@const items = {
					mistri,
					labour,
					eit,
					morang,
					baalu,
					githi,
					cement,
					saria,
					dust,
					other,
					other2
				}}
				<tr>
					<th class="bg-base-100">
						{index + 1}
					</th>
					{#each Object.entries(items) as [_, item]}
						<td class={item.paid ? '!bg-accent !text-accent-content' : ''}>{item.quantity}</td>
						<td class={item.paid ? '!bg-accent !text-accent-content' : ''}
							>{toCurrency(item.cost)}</td
						>
					{/each}
					<td class="!bg-accent !text-accent-content">{toCurrency(entry.managerSpentAmount)}</td>
					<td>{toCurrency(entry.total)}</td>
					<td>{entry.note}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<SiteDetailTableHeader />
		</tfoot>
	</table>
</div>

<Pagination {page} {pageCount} getHref={(p) => `${routePrefix}/site/detail/${site.id}/${p}`} />

<!-- Create Site entry Button -->
{#if !$session.isAdmin}
	<a
		id="create-site-entry"
		href={`/manager/siteEntry/create/${site.id}?redirect=${redirect}`}
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
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
			/>
		</svg>
	</a>
{/if}
