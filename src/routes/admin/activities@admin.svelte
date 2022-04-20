<script lang="ts">
	import Pagination from '$lib/Pagination.svelte';
	import type { Activity } from '@prisma/client';
	import { formatDistance } from 'date-fns';

	export let activities: Activity[] = [];
	export let superAdmin: boolean = false;

	export let pageCount: number;
	export let page: number;
</script>

<div class="flex p-2">
	<ul class="mx-auto flex flex-col gap-2">
		{#each activities as activity}
			<li>
				<span>•</span>
				<span class="text-lg capitalize text-accent"> {activity.username} </span>
				performed
				<span class="text-lg text-accent"> {activity.activity}</span>
				<span>{formatDistance(new Date(activity.createdAt), new Date())}</span> ago
				{#if superAdmin}
					<a href="/admin/activity/{activity.id}" class="btn btn-accent btn-sm">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="inline-block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
					</a>
				{/if}
			</li>
		{/each}
	</ul>
</div>

<Pagination {page} {pageCount} getHref={(p) => `/admin/activities?page=${p}`} />
