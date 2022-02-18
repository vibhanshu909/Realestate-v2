<script lang="ts">
	import { kconstants } from '$lib/kconstants';
	import type { User } from '@prisma/client';

	export let users: (User & {
		_count: {
			sites: number;
		};
		totalSitesCost: BigInt;
	})[];
	// let loading = true;
	// onMount(async () => {
	// 	try {
	// 		users = (await fetch('api/users').then<{ data: User[] }>((res) => res.json())).data;
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
				<th>Username</th>
				<th>Phone Number</th>
				<th>Total Sites</th>
				<th>Total Sites Cost({kconstants.currencySymbol})</th>
				<th>Total Received Amount({kconstants.currencySymbol})</th>
				<th>Spent Amount({kconstants.currencySymbol})</th>
				<th>Balance Amount({kconstants.currencySymbol})</th>
			</tr>
		</thead>
		<tbody>
			{#each users as user, index}
				{@const {
					createdAt,
					username,
					contact,
					_count: { sites: totalSites },
					spent,
					totalSitesCost,
					totalReceivedAmount
				} = user}
				<tr>
					<th class="bg-base-100">{index + 1}</th>
					<td>{createdAt}</td>
					<td>{username}</td>
					<td><a href={'tel:' + contact}>{contact}</a></td>
					<td>{totalSites}</td>
					<td>{totalSitesCost}</td>
					<td>{totalReceivedAmount}</td>
					<td>{spent}</td>
					<td>{totalReceivedAmount - spent}</td>
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
