<script lang="ts">
	import formatDate from '$lib/date';
	import { kconstants } from '$lib/kconstants';
	import { toCurrency } from '$lib/toCurrency';
	import type { User } from '@prisma/client';
	import UserActions from './userActions.svelte';

	export let users: (User & {
		_count: {
			sites: number;
		};
		totalSitesCost: bigint;
	})[];
</script>

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
			{#each users as user (user.id)}
				{@const {
					createdAt,
					username,
					contact,
					_count: { sites: totalSites },
					spent,
					totalSitesCost,
					totalReceivedAmount
				} = user}
				{@const balance = BigInt(totalReceivedAmount) - BigInt(spent)}
				<tr>
					<th class="actions bg-base-100 p-0">
						<UserActions {user} />
					</th>
					<td>{formatDate(createdAt)}</td>
					<td>{username}</td>
					<td><a href={'tel:' + contact}>{contact}</a></td>
					<td>{totalSites}</td>
					<td>{toCurrency(totalSitesCost)}</td>
					<td>{toCurrency(totalReceivedAmount)}</td>
					<td>{toCurrency(spent)}</td>
					<td class={balance < 0 ? 'text-error' : 'text-success'}>{toCurrency(balance)}</td>
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
