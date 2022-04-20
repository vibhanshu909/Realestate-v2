<script lang="ts" context="module">
	import formatDate from '$lib/date';
	import { HistoryType } from '$lib/db';
	import ManagerTransactionTableHeader from '$lib/manager/ManagerTransactionTableHeader.svelte';
	import { toCurrency } from '$lib/toCurrency';
	import type { History } from '@prisma/client';
	const maxPage = 5;
</script>

<script lang="ts">
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

	{#if pageCount > 1}
		<div class="flex items-center justify-center py-5">
			<div class="btn-group flex justify-center gap-y-1">
				{#each new Array(Math.min(pageCount, maxPage)).fill(0) as _, i}
					{@const p = i + 1}
					{@const last = p === maxPage}
					{#if last}
						<span class="self-end px-1">•••</span>
						<a
							href={`/admin/manager/transaction/${transactions[0].userId}?page=${pageCount}`}
							class="btn"
							class:btn-active={pageCount === page}>{pageCount}</a
						>
					{:else}
						<a
							href={`/admin/manager/transaction/${transactions[0].userId}?page=${p}`}
							class="btn"
							class:btn-active={p === page}>{p}</a
						>
					{/if}
				{/each}
			</div>
		</div>
	{/if}
{/if}
