<script context="module" lang="ts">
	import UserActionModals from '$lib/admin/UserActionModals.svelte';
	import UserTableHeader from '$lib/admin/UserTableHeader.svelte';
	import formatDate from '$lib/date';
	import ModalButton from '$lib/ModalButton.svelte';
	import { toCurrency } from '$lib/toCurrency';
	import type { User } from '@prisma/client';
</script>

<script lang="ts">
	export let users: (User & {
		_count: {
			sites: number;
		};
		totalSitesCost: bigint;
	})[];
</script>

<div class="h-full">
	<div class="overflow-x-auto">
		<table class="table-zebra table-compact table w-full">
			<thead>
				<UserTableHeader />
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
							<ModalButton id={user.id} />
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
				<UserTableHeader />
			</tfoot>
		</table>
	</div>
	{#each users as user (user.id)}
		<UserActionModals {user} />
	{/each}
	<a
		id="create-manager"
		href="/admin/manager/create"
		class="btn btn-circle btn-primary btn-lg sticky top-[83%] left-full mr-2"
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
				d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
			/>
		</svg>
	</a>
</div>
