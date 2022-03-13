<script lang="ts" context="module">
	import formatDate from '$lib/date';
	import { kconstants } from '$lib/kconstants';
	import { toCurrency } from '$lib/toCurrency';
	import type { History } from '@prisma/client';
</script>

<script lang="ts">
	export let transactions: History[];
	export let errors: string[];
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
		<table class="table-compact table w-full">
			<thead>
				<tr>
					<th />
					<th>Created At</th>
					<th>Amount ({kconstants.currencySymbol})</th>
					<th>Transaction Type</th>
					<th>Balance ({kconstants.currencySymbol})</th>
					<th>Note</th>
				</tr>
			</thead>
			<tbody>
				{#each transactions as history, index (history.id)}
					{@const { createdAt, amount, type, balance, note } = history}
					<tr>
						<th class="bg-base-100">{index + 1} </th>
						<td>{formatDate(createdAt)}</td>
						<td>{amount}</td>
						<td>{type}</td>
						<td class={balance < 0 ? 'text-error' : 'text-success'}>{toCurrency(balance)}</td>
						<td>{note}</td>
					</tr>
				{/each}
			</tbody>
			<tfoot>
				<tr>
					<th />
					<th>Created At</th>
					<th>Amount ({kconstants.currencySymbol})</th>
					<th>Transaction Type</th>
					<th>Balance ({kconstants.currencySymbol})</th>
					<th>Note</th>
				</tr>
			</tfoot>
		</table>
	</div>
{/if}
