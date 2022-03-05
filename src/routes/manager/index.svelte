<script lang="ts" context="module">
	import formatDate from '$lib/date';
	import { kconstants } from '$lib/kconstants';
	import { toCurrency } from '$lib/toCurrency';
	import type { Site, User } from '@prisma/client';
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ props }) => {
		return {
			props
		};
	};
</script>

<script lang="ts">
	export let user: Omit<User, 'password'>;
	export let siteCount: number;
	export let sites: Site[];
</script>

<div
	data-theme="business"
	class="stats mx-1 my-2 grid grid-flow-row grid-cols-2 grid-rows-2 text-primary-content shadow ring-2 md:grid-cols-4 md:grid-rows-1"
>
	<div class="stat">
		<div class="stat-title">Sites</div>
		<div class="stat-value -lg:text-base">{siteCount}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Received Amount (₹)</div>
		<div class="stat-value -lg:text-base">{toCurrency(user.totalReceivedAmount)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Spent Amount (₹)</div>
		<div class="stat-value -lg:text-base">{toCurrency(user.spent)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Balance (₹)</div>
		<div
			class={`stat-value -lg:text-base ${BigInt(user.balance) < 0n ? 'text-error' : 'text-sucess'}`}
		>
			{toCurrency(user.balance)}
		</div>
	</div>
</div>

<div class="overflow-x-auto">
	<table class="table-compact table w-full">
		<thead>
			<tr>
				<th />
				<th>Created At</th>
				<th>Name</th>
				<th>Location</th>
				<th>Total Entries</th>
				<th>Last Entry On</th>
				<th>Manager Spent Amount({kconstants.currencySymbol})</th>
				<th>Total Cost({kconstants.currencySymbol})</th>
			</tr>
		</thead>
		<tbody>
			{#each sites as site, index}
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
					<th class="bg-base-100">{index + 1}</th>
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
			<tr>
				<th />
				<th>Created At</th>
				<th>Name</th>
				<th>Location</th>
				<th>Total Entries</th>
				<th>Last Entry On</th>
				<th>Manager Spent Amount({kconstants.currencySymbol})</th>
				<th>Total Cost({kconstants.currencySymbol})</th>
			</tr>
		</tfoot>
	</table>
</div>
