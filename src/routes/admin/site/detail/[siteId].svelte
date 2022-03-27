<script lang="ts">
	import { kconstants } from '$lib/kconstants';
	import { toCurrency } from '$lib/toCurrency';
	import type { Site, SiteEntry, User } from '@prisma/client';

	export let site: Site & {
		manager: User;
	};
	export let entries: SiteEntry[];
	export let totalEntries: number;
	const { mistri, labour, eit, morang, baalu, githi, cement, saria, dust, other, other2 } =
		site.total;
</script>

<div
	class="stats mx-1 my-2 grid grid-flow-row grid-cols-2 grid-rows-2 shadow ring-2 md:grid-cols-4 md:grid-rows-1"
>
	<div class="stat">
		<div class="stat-title">Name</div>
		<p class="stat-value whitespace-normal -lg:text-base">
			{site.name}
		</p>
	</div>
	<div class="stat">
		<div class="stat-title">Location</div>
		<div class="stat-value -lg:text-base">{site.location}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Total Cost ({kconstants.currencySymbol})</div>
		<div class="stat-value -lg:text-base">{toCurrency(site.cost)}</div>
	</div>
	<div class="stat">
		<div class="stat-title">Total Entry</div>
		<div class={`stat-value -lg:text-base`}>
			{totalEntries}
		</div>
	</div>
	<div class="stat">
		<div class="stat-title">Manager</div>
		<div class={`stat-value -lg:text-base`}>
			{site.manager.username}
		</div>
	</div>
	<div class="stat">
		<div class="stat-title">Manager Spent Amount ({kconstants.currencySymbol})</div>
		<div class={`stat-value -lg:text-base`}>
			{toCurrency(site.manager.spent)}
		</div>
	</div>
</div>

<!-- Total Table -->
<div class="my-5 overflow-x-auto">
	<table class="table-compact table w-full">
		<thead>
			<tr>
				<th />
				<th colspan="2" class="text-center">Mistri</th>
				<th colspan="2" class="text-center">Labour</th>
				<th colspan="2" class="text-center">Eit</th>
				<th colspan="2" class="text-center">Morang</th>
				<th colspan="2" class="text-center">Baalu</th>
				<th colspan="2" class="text-center">Githi</th>
				<th colspan="2" class="text-center">Cement</th>
				<th colspan="2" class="text-center">Saria</th>
				<th colspan="2" class="text-center">Dust</th>
				<th colspan="2" class="text-center">Other</th>
				<th colspan="2" class="text-center">Other 2</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th />
				{#each new Array(11) as _}
					<th>Quantity</th>
					<th>Price({kconstants.currencySymbol})</th>
				{/each}
			</tr>
			<tr>
				<th />
				<td>{mistri.quantity}</td>
				<td>{toCurrency(mistri.cost)}</td>
				<td>{labour.quantity}</td>
				<td>{toCurrency(labour.cost)}</td>
				<td>{eit.quantity}</td>
				<td>{toCurrency(eit.cost)}</td>
				<td>{morang.quantity}</td>
				<td>{toCurrency(morang.cost)}</td>
				<td>{baalu.quantity}</td>
				<td>{toCurrency(baalu.cost)}</td>
				<td>{githi.quantity}</td>
				<td>{toCurrency(githi.cost)}</td>
				<td>{cement.quantity}</td>
				<td>{toCurrency(cement.cost)}</td>
				<td>{saria.quantity}</td>
				<td>{toCurrency(saria.cost)}</td>
				<td>{dust.quantity}</td>
				<td>{toCurrency(dust.cost)}</td>
				<td>N/A</td>
				<td>{toCurrency(other)}</td>
				<td>N/A</td>
				<td>{toCurrency(other2)}</td>
			</tr>
		</tbody>
		<tfoot>
			<tr>
				<th />
				<th colspan="2" class="text-center">Mistri</th>
				<th colspan="2" class="text-center">Labour</th>
				<th colspan="2" class="text-center">Eit</th>
				<th colspan="2" class="text-center">Morang</th>
				<th colspan="2" class="text-center">Baalu</th>
				<th colspan="2" class="text-center">Githi</th>
				<th colspan="2" class="text-center">Cement</th>
				<th colspan="2" class="text-center">Saria</th>
				<th colspan="2" class="text-center">Dust</th>
				<th colspan="2" class="text-center">Other</th>
				<th colspan="2" class="text-center">Other 2</th>
			</tr>
		</tfoot>
	</table>
</div>

<!-- Entries Table -->
<div class="overflow-x-auto">
	<table class="table-zebra table-compact table w-full">
		<thead>
			<tr>
				<th />
				<th colspan="2" class="text-center">Mistri</th>
				<th colspan="2" class="text-center">Labour</th>
				<th colspan="2" class="text-center">Eit</th>
				<th colspan="2" class="text-center">Morang</th>
				<th colspan="2" class="text-center">Baalu</th>
				<th colspan="2" class="text-center">Githi</th>
				<th colspan="2" class="text-center">Cement</th>
				<th colspan="2" class="text-center">Saria</th>
				<th colspan="2" class="text-center">Dust</th>
				<th colspan="2" class="text-center">Other</th>
				<th colspan="2" class="text-center">Other 2</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<th />
				{#each new Array(11) as _}
					<th>Quantity</th>
					<th>Price({kconstants.currencySymbol})</th>
				{/each}
			</tr>
			{#each entries as entry, index}
				{@const { mistri, labour, eit, morang, baalu, githi, cement, saria, dust, other, other2 } =
					entry}
				<tr>
					<th class="bg-base-100">
						{index + 1}
					</th>
					<td>{mistri.quantity}</td>
					<td>{toCurrency(mistri.cost)}</td>
					<td>{labour.quantity}</td>
					<td>{toCurrency(labour.cost)}</td>
					<td>{eit.quantity}</td>
					<td>{toCurrency(eit.cost)}</td>
					<td>{morang.quantity}</td>
					<td>{toCurrency(morang.cost)}</td>
					<td>{baalu.quantity}</td>
					<td>{toCurrency(baalu.cost)}</td>
					<td>{githi.quantity}</td>
					<td>{toCurrency(githi.cost)}</td>
					<td>{cement.quantity}</td>
					<td>{toCurrency(cement.cost)}</td>
					<td>{saria.quantity}</td>
					<td>{toCurrency(saria.cost)}</td>
					<td>{dust.quantity}</td>
					<td>{toCurrency(dust.cost)}</td>
					<td>N/A</td>
					<td>{toCurrency(other.cost)}</td>
					<td>N/A</td>
					<td>{toCurrency(other2.cost)}</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<th />
				<th colspan="2" class="text-center">Mistri</th>
				<th colspan="2" class="text-center">Labour</th>
				<th colspan="2" class="text-center">Eit</th>
				<th colspan="2" class="text-center">Morang</th>
				<th colspan="2" class="text-center">Baalu</th>
				<th colspan="2" class="text-center">Githi</th>
				<th colspan="2" class="text-center">Cement</th>
				<th colspan="2" class="text-center">Saria</th>
				<th colspan="2" class="text-center">Dust</th>
				<th colspan="2" class="text-center">Other</th>
				<th colspan="2" class="text-center">Other 2</th>
			</tr>
		</tfoot>
	</table>
</div>
