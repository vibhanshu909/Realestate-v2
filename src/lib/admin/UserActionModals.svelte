<script lang="ts">
	import { portal } from '$lib/actions';
	import type { User } from '@prisma/client';
	export let user: Pick<User, 'id' | 'isAdmin' | 'username'>;
</script>

<div use:portal={'modal'}>
	<input type="checkbox" id={user.id} class="modal-toggle" />
	<label for={user.id} class="modal modal-bottom sm:modal-middle">
		<div class="modal-box relative ring ring-secondary">
			<div class="my-2 text-center">
				<h1 class="text-2xl text-secondary">Actions</h1>
				<p class="text-xs">({user.username})</p>
			</div>
			<div class="modal-action contents">
				<ul class="menu bg-base-100">
					<li>
						<a href={`/admin/manager/sites/${user.id}`} class="view-manager-sites">
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
									d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
								/>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
								/>
							</svg>
							View Sites</a
						>
					</li>
					<li>
						<a href={`/admin/manager/credit/${user.id}`} class="manager-credit">
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
									d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Credit</a
						>
					</li>
					<li>
						<a href={`/admin/manager/transaction/${user.id}`} class="manager-history">
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
									d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
							Transaction History</a
						>
					</li>
					<li>
						<a href={`/admin/manager/edit/${user.id}`} class="manager-edit">
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
									d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
								/>
							</svg>
							Edit</a
						>
					</li>
					<li>
						<a href={`/admin/manager/changePassword/${user.id}`} class="manager-change-password">
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
									d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
								/>
							</svg>
							Change Password</a
						>
					</li>
					<li>
						<!-- The button to open modal -->

						<a
							href="#delete-confirmation-dialog-{user.id}"
							class="manager-delete flex w-full gap-3 text-error"
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
									d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
								/>
							</svg>
							Delete</a
						>
					</li>
				</ul>
			</div>
		</div>
	</label>
	<!-- Put this part before </body> tag -->
	<div class="modal" id="delete-confirmation-dialog-{user.id}">
		<div class="modal-box ring ring-secondary">
			<h3 class="text-lg font-bold">Are you sure?</h3>
			<p class="py-4">
				You want to delete <span class="text-accent">{user.username}</span>? This action is
				irreversible.
			</p>
			<div class="modal-action flex justify-end gap-3">
				<a
					href={`/admin/manager/delete/${user.id}`}
					class="delete-action-yes btn btn-error"
					sveltekit:reload>Yes</a
				>
				<a href={'#'} class="delete-action-no btn">No</a>
			</div>
		</div>
	</div>
</div>
