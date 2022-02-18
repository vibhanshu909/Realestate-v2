<script lang="ts">
	import { kconstants } from '$lib/kconstants';
	import type { Site } from '@prisma/client';

	export let sites: (Site & {
		manager: {
			username: string;
		};
		_count: {
			siteEntries: number;
		};
	})[];
	// let loading = true;
	// onMount(async () => {
	// 	try {
	// 		sites = (await fetch('api/sites').then<{ data: Site[] }>((res) => res.json())).data;
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		loading = false;
	// 	}
	// });
</script>

<!-- {#if loading}
	<div class="hero min-h-screen bg-base-200">
		<div class="text-center hero-content">
			<div class="max-w-md">
				<h1 class="text-xl font-bold btn btn-disabled loading">loading</h1>
			</div>
		</div>
	</div>
{:else} -->
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
					<td>{createdAt}</td>
					<td>{name}</td>
					<td>{location}</td>
					<td>{totalEntries}</td>
					<td>{updatedAt}</td>
					<td>{username}</td>
					<td>{managerSpentAmount}</td>
					<td>{cost}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th />
				<th>Created At</th>
				<th>Username</th>
				<th>Phone Number</th>
				<th>Total Sites</th>
				<th>Total Sites Cost({kconstants.currencySymbol})</th>
				<th>Total Received Amount({kconstants.currencySymbol})</th>
				<th>Spent Amount({kconstants.currencySymbol})</th>
				<th>Balance Amount({kconstants.currencySymbol})</th>
			</tr>
		</tfoot>
	</table>
</div>
<!-- {/if} -->
