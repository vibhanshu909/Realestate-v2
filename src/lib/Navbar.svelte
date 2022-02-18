<script lang="ts">
	import type { User } from '@prisma/client';
	export let user: (Partial<User> & Pick<User, 'isAdmin'>) | undefined;
	const isAdmin = user?.isAdmin || false;
</script>

<div class="navbar bg-base-100 gap-3 fixed z-50 shadow-lg">
	{#if isAdmin}
		<div class="flex-none">
			<button class="btn btn-square outline outline-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block w-5 h-5 stroke-current"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</button>
		</div>
	{/if}
	<div class="flex-1">
		<a class="link link-hover normal-case text-xl" href="/">Real Estate</a>
	</div>
	{#if user?.username}
		<div class="flex-none">
			<div class="dropdown dropdown-end">
				<label for="" tabindex="0" class="btn btn-circle avatar outline outline-1">
					<div class="w-10 rounded-full">
						<div class="h-full flex justify-center items-center">
							<span class="block text-xl">{user.username[0].toUpperCase()}</span>
						</div>
					</div>
				</label>
				<ul
					tabindex="0"
					class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
				>
					<li>
						<a href="/" class="justify-between">
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a href="/">Settings</a></li>
					<li><a href="/">Logout</a></li>
				</ul>
			</div>
		</div>
	{/if}
</div>
