<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="h-full">
	<div class="btn-group">
		<a href="/admin" class="btn md:btn-wide" class:btn-active={$page.url.pathname === '/admin'}
			>Users</a
		>
		<!-- <div class="divider divider-horizontal m-0 w-1" /> -->
		<a
			href="/admin/sites"
			class="btn md:btn-wide"
			class:btn-active={$page.url.pathname === '/admin/sites'}>Sites</a
		>
		<a
			href="/admin/activities"
			class="btn md:btn-wide"
			class:btn-active={$page.url.pathname === '/admin/activities'}>Activities</a
		>
	</div>
	<slot />
</div>
