<script lang="ts" context="module">
	const maxPage = 5;
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	export let pageCount: number;
	export let page: number;
	export let getHref: (p: number) => string;

	let focusThis: HTMLAnchorElement;
	let paginator: HTMLDivElement;
	onMount(() => {
		if (paginator && focusThis) {
			const ob = new IntersectionObserver(
				(elems, { unobserve, disconnect }) => {
					if (elems[0].isIntersecting) {
						const fn =
							'scrollIntoViewIfNeeded' in focusThis ? 'scrollIntoViewIfNeeded' : 'scrollIntoView';
						focusThis[fn]();
						unobserve(elems[0].target);
						disconnect();
					}
				},
				{ threshold: [0.7] }
			);
			ob.observe(paginator);
		}
	});
</script>

{#if pageCount > 1}
	<div class="flex flex-nowrap items-center justify-center py-5" bind:this={paginator}>
		<div class="btn-group flex flex-nowrap overflow-auto">
			{#each new Array(pageCount).fill(0) as _, i}
				{@const p = i + 1}
				{#if p === page}
					<a href={getHref(p)} class="btn btn-active" bind:this={focusThis}>{p}</a>
				{:else}
					<a href={getHref(p)} class="btn">{p}</a>
				{/if}
			{/each}
		</div>
	</div>
{/if}
