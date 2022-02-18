<script lang="ts">
	export let user: App.Session | undefined;
	const isAdmin = user?.isAdmin || false;
</script>

<div class="navbar fixed z-50 gap-3 bg-base-100 shadow-lg">
	{#if isAdmin}
		<div class="flex-none">
			<button class="btn btn-square outline outline-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="inline-block h-5 w-5 stroke-current"
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
		<a class="link-hover link text-xl normal-case" href="/">Real Estate</a>
	</div>
	{#if user?.username}
		<div class="flex-none">
			<div class="dropdown-end dropdown">
				<label for="" tabindex="0" class="btn btn-circle avatar outline outline-1">
					<div class="w-10 rounded-full">
						<div class="flex h-full items-center justify-center">
							<span class="block text-xl">{user.username[0].toUpperCase()}</span>
						</div>
					</div>
				</label>
				<ul
					tabindex="0"
					class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
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
