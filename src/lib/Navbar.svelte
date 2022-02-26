<script lang="ts">
	export let user: App.Session | undefined;
	const isAdmin = user?.isAdmin || false;
</script>

<div class="navbar sticky top-0 z-50 gap-3 bg-base-100 shadow-lg">
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
				<div
					class="dropdown-content rounded-box mt-3 w-52 bg-base-100 p-2 shadow ring ring-primary"
				>
					<div class="flex items-center gap-1 p-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
						<span class="text-xl capitalize">{user.username}</span>
					</div>
					<div class="divider m-0 h-0" />
					<ul tabindex="0" class="menu menu-compact">
						<li>
							<a href="/profile/changeContact"
								><svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
									/>
								</svg>
								<span> Change Contact</span></a
							>
						</li>
						<li>
							<a href="/profile/changePassword">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
									/>
								</svg>
								<span> Change Password</span></a
							>
						</li>
						<li>
							<a href="/auth/logout" rel="external">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
									/>
								</svg>
								<span> Logout</span></a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}
</div>
