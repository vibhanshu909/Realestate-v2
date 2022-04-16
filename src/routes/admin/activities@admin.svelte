<script lang="ts">
	import type { Activity } from '@prisma/client';
	import { formatDistance } from 'date-fns';
	export let activities: Activity[] = [];
</script>

<div class="flex p-2">
	<ul class="mx-auto flex flex-col gap-4">
		{#each activities as activity}
			<li>
				<span>•</span>
				<span class="text-lg capitalize text-accent"> {activity.username} </span>
				performed
				<span class="text-lg text-accent"> {activity.activity}</span>
				<span>{formatDistance(new Date(activity.createdAt), new Date())}</span> ago
			</li>
		{/each}
	</ul>
</div>
