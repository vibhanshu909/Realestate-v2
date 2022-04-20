<script lang="ts">
	import type { Activity } from '@prisma/client';
	import { formatDistance } from 'date-fns';
	export let activity: Activity;
	// const { params, formData } = JSON.parse(activity.arguments.toString());
	const { params, formData, ...rest } = activity.arguments;
</script>

<div class="stats stats-vertical shadow">
	<div class="stat">
		<div class="stat-title">User</div>
		<div class="stat-value">{activity.username}</div>
		<div class="stat-desc">{activity.createdAt}</div>
		<div class="stat-desc">{formatDistance(new Date(activity.createdAt), new Date())}</div>
	</div>

	<div class="stat">
		<div class="stat-title">Activity</div>
		<div class="stat-value">{activity.activity}</div>
		<!-- <div class="stat-desc">↗︎ 400 (22%)</div> -->
	</div>

	<div class="stat">
		<div class="stat-title">Data</div>
		<div class="stat-value">
			{#if params || formData}
				{#if params}
					{#each Object.entries(params) as [key, value]}
						{key}: {value}<br />
					{/each}
				{/if}
				{#if formData}
					<div class="divider before:bg-accent after:bg-accent" />
					{#each Object.entries(formData) as [_, [key, value]]}
						{key}: {value}<br />
					{/each}
				{/if}
			{:else}
				<pre>{JSON.stringify(rest, null, 2)}</pre>
			{/if}
		</div>
	</div>
</div>
