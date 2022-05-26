<script lang="ts">
	import formatDate from '$lib/date';
	import ManagerTransactionTableHeader from '$lib/manager/ManagerTransactionTableHeader.svelte';
	import Pagination from '$lib/Pagination.svelte';
	import { toCurrency } from '$lib/toCurrency';
	import type { History } from '@prisma/client';
	// TODO: Sync HistoryType
	// import { HistoryType } from '$lib/db';
	enum HistoryType {
		CREDIT = 'CREDIT',
		DEBIT = 'DEBIT'
	}

	export let transactions: History[];
	export let errors: string[];
	export let pageCount: number;
	export let page: number;
</script>

{#if errors?.length > 0}
	<div>
		<h2>Errors</h2>
		<ul>
			{#each errors as error}
				<li>{error}</li>
			{/each}
		</ul>
	</div>
{:else}
	<div class="overflow-x-auto">
		<table class="table-compact table-zebra table w-full">
			<thead>
				<ManagerTransactionTableHeader />
			</thead>
			<tbody>
				{#each transactions as history, index (history.id)}
					{@const { createdAt, amount, type, balance, note } = history}
					<tr>
						<th class="bg-base-100">{index + 1} </th>
						<td>{formatDate(createdAt)}</td>
						<td class={amount < 0 ? 'text-error' : 'text-accent'}>{toCurrency(amount)}</td>
						<td class={type === HistoryType.CREDIT ? 'text-accent' : 'text-error'}>{type}</td>
						<td class={balance < 0 ? 'text-error' : 'text-accent'}>{toCurrency(balance)}</td>
						<td>{note}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<ManagerTransactionTableHeader />
			</tfoot>
		</table>
	</div>

	<Pagination
		{page}
		{pageCount}
		getHref={(p) => `/admin/manager/transaction/${transactions[0].userId}?page=${p}`}
	/>
{/if}
