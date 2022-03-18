<script context="module" lang="ts">
	import Layout from '$lib/admin/layout.svelte';
	import Users from '$lib/admin/users.svelte';
	import type { User } from '@prisma/client';
</script>

<script lang="ts">
	export let users: (User & {
		_count: {
			sites: number;
		};
		totalSitesCost: bigint;
	})[];
</script>

<Layout>
	<div class="h-full">
		<Users {users} />

		<a
			href="/admin/manager/create"
			class="btn btn-circle btn-primary btn-lg sticky top-[83%] left-full mr-2"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
				/>
			</svg>
		</a>
	</div>
</Layout>
