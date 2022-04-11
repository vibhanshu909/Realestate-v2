<script lang="ts">
	export let errors: string[] = [];
</script>

{#if errors?.length}
	<div class="my-2 text-error">
		{#each errors as error}
			<div class="inline-flex gap-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<p>{error}</p>
			</div>
		{/each}
	</div>
{:else}
	<div class="my-2">
		<p class="text-error text-xl">Some unknown error occured!</p>
	</div>
{/if}
