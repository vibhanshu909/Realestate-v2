<script lang="ts" context="module">
	import formatDate from '$lib/date';
	import { kconstants } from '$lib/kconstants';
	import ManagerSiteTableHeader from '$lib/manager/ManagerSiteTableHeader.svelte';
	import SiteActionModals from '$lib/manager/SiteActionModals.svelte';
	import ModalButton from '$lib/ModalButton.svelte';
	import { toCurrency } from '$lib/toCurrency';
	import type { Site, User } from '@prisma/client';
</script>

<script lang="ts">
	export let user: Omit<User, 'password'>;
	export let siteCount: number;
	export let sites: (Site & {
		_count: {
			siteEntries: number;
		};
	})[];
</script>

<div
	class="stats mx-1 my-2 grid grid-flow-row grid-cols-2 grid-rows-2 shadow ring-2 md:grid-cols-4 md:grid-rows-1"
>
	<div class="stat">
		<div class="stat-title">Sites</div>
		<div class="stat-value -lg:text-base">{siteCount}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Received Amount ({kconstants.currencySymbol})</div>
		<div class="stat-value -lg:text-base">{toCurrency(user.totalReceivedAmount)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Spent Amount ({kconstants.currencySymbol})</div>
		<div class="stat-value -lg:text-base">{toCurrency(user.spent)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Balance ({kconstants.currencySymbol})</div>
		<div
			class={`stat-value -lg:text-base ${BigInt(user.balance) < 0 ? 'text-error' : 'text-sucess'}`}
		>
			{toCurrency(user.balance)}
		</div>
	</div>
</div>

<div class="overflow-x-auto">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<ManagerSiteTableHeader />
		</thead>
		<tbody>
			{#each sites as site}
				{@const {
					createdAt,
					updatedAt,
					name,
					location,
					_count: { siteEntries: totalEntries },
					managerSpentAmount,
					cost
				} = site}
				<tr>
					<th class="actions bg-base-100 p-0">
						<ModalButton id={site.id} />
					</th>
					<td>{formatDate(createdAt)}</td>
					<td>{name}</td>
					<td>{location}</td>
					<td>{totalEntries}</td>
					<td>{formatDate(updatedAt)}</td>
					<td>{toCurrency(managerSpentAmount)}</td>
					<td>{toCurrency(cost)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<ManagerSiteTableHeader />
		</tfoot>
	</table>
</div>

{#each sites as site}
	<SiteActionModals {site} />
{/each}
