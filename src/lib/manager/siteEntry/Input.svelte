<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let name: string;
	export let label = name[0].toUpperCase() + name.slice(1);
	export let quantityType: string = 'number';
	export let autofocus = false;

	let cost: HTMLInputElement;
	let paid: HTMLInputElement;

	const dispatch = createEventDispatcher();
	export const change = () => {
		dispatch('calc', {
			name,
			cost: BigInt(cost.value),
			paid: paid.checked
		});
	};
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}*</span>
	</label>
	<input
		name={name + '.quantity'}
		type={quantityType}
		placeholder="Quantity"
		min="0"
		value={quantityType === 'number' ? 0 : 'N/A'}
		class="input input-bordered"
		required
		autocomplete="off"
		{autofocus}
	/>
	<input
		name={name + '.cost'}
		type="number"
		value={0}
		placeholder="Cost"
		class="input input-bordered my-2"
		required
		autocomplete="off"
		on:change={change}
		bind:this={cost}
	/>
	<label class="label cursor-pointer justify-start gap-2">
		<input
			name={name + '.paid'}
			type="checkbox"
			class="checkbox checkbox-primary"
			on:change={change}
			bind:this={paid}
		/>
		<span class="label-text">Paid</span>
	</label>
</div>
