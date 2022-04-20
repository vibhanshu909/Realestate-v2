<script lang="ts" context="module">
	const maxPage = 5;
</script>

<script lang="ts">
	export let pageCount: number;
	export let page: number;
	export let getHref: (p: number) => string;
</script>

{#if pageCount > 1}
	<div class="flex items-center justify-center py-5">
		<div class="btn-group flex justify-center gap-y-1">
			{#each new Array(Math.min(pageCount, maxPage)).fill(0) as _, i}
				{@const p = i + 1}
				{@const last = p === maxPage}
				{#if last}
					{#if page < pageCount - 1}
						<span class="self-end px-1">•••</span>
					{/if}
					<a href={getHref(pageCount)} class="btn" class:btn-active={pageCount === page}
						>{pageCount}</a
					>
					<!-- {:else if page > 2}
					<a href={getHref(p + 1)} class="btn" class:btn-active={p + 1 === page}>{p + 1}</a> -->
				{:else}
					<a href={getHref(p)} class="btn" class:btn-active={p === page}>{p}</a>
				{/if}
			{/each}
		</div>
	</div>
{/if}
