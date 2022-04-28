<script>
	import { kconstants } from '$lib/kconstants';
	export let totalTable = false;
</script>

<tr>
	<th />
	<th class="text-center">Created At</th>
	<th colspan="2" class="text-center">Mistri</th>
	<th colspan="2" class="text-center">Labour</th>
	<th colspan="2" class="text-center">Eit</th>
	<th colspan="2" class="text-center">Morang</th>
	<th colspan="2" class="text-center">Baalu</th>
	<th colspan="2" class="text-center">Githi</th>
	<th colspan="2" class="text-center">Cement</th>
	<th colspan="2" class="text-center">Saria</th>
	<th colspan="2" class="text-center">Dust</th>
	{#if totalTable}
		<th class="text-center">Other({kconstants.currencySymbol})</th>
		<th class="text-center">Other 2({kconstants.currencySymbol})</th>
	{:else}
		<th colspan="2" class="text-center">Other</th>
		<th colspan="2" class="text-center">Other 2</th>
	{/if}
	<th class="text-center">Manager Total({kconstants.currencySymbol})</th>
	<th class="text-center">Total({kconstants.currencySymbol})</th>
	{#if !totalTable}
		<th class="text-center">Note</th>
	{/if}
</tr>
