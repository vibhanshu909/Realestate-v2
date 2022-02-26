<script context="module" lang="ts">
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

<Users {users} />
