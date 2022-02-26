<script lang="ts">
	import formatDate from '$lib/date';
	import { kconstants } from '$lib/kconstants';
	import { toCurrency } from '$lib/toCurrency';
	import type { Site } from '@prisma/client';

	export let sites: (Site & {
		manager: {
			username: string;
		};
		_count: {
			siteEntries: number;
		};
	})[];
</script>

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
				<th>Manager</th>
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
					manager: { username },
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
					<td>{username}</td>
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
				<th>Manager</th>
				<th>Manager Spent Amount({kconstants.currencySymbol})</th>
				<th>Total Cost({kconstants.currencySymbol})</th>
			</tr>
		</tfoot>
	</table>
</div>
