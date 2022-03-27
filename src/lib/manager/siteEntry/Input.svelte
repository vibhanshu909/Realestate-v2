<script lang="ts">
	export let name: string;
	export let label = name[0].toUpperCase() + name.slice(1);
</script>

<div class="form-control">
	<label class="label" for={name}>
		<span class="label-text">{label}</span>
	</label>
	<input
		name={name + '.quantity'}
		type="number"
		placeholder="Quantity"
		min="0"
		class="input input-bordered"
		required
	/>
	<input
		name={name + '.cost'}
		type="number"
		placeholder="Cost"
		class="input input-bordered my-2"
		required
	/>
	<label class="label cursor-pointer justify-start gap-2">
		<input name={name + '.paid'} type="checkbox" class="checkbox checkbox-primary" />
		<span class="label-text">Paid</span>
	</label>
</div>
