<script lang="ts">
	import type { Site } from '@prisma/client';
	export let site: Site;
	export let errors: string[] = [];
	let submitting = false;
	let form: HTMLFormElement;
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content w-full flex-col lg:flex-row-reverse">
		<div class="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
			<div class="card-body">
				<h1 class="text-center text-2xl">Update Site</h1>
				{#if errors.length}
					<div class="my-2 text-error">
						{#each errors as error}
							<div class="inline-flex gap-1">
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
										d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
								<p>{error}</p>
							</div>
						{/each}
					</div>
				{/if}
				<form
					method="POST"
					bind:this={form}
					on:submit|preventDefault={() => {
						submitting = true;
						form.submit();
					}}
				>
					<fieldset disabled={submitting}>
						<div class="form-control">
							<label class="label" for="name">
								<span class="label-text">Site Name*</span>
							</label>
							<input
								name="name"
								id="name"
								value={site.name}
								type="text"
								placeholder="site name"
								class="input input-bordered"
								required
								autocomplete="off"
								autofocus
							/>
						</div>
						<div class="form-control">
							<label class="label" for="location">
								<span class="label-text">Location*</span>
							</label>
							<input
								name="location"
								id="location"
								value={site.location}
								type="text"
								placeholder="location"
								class="input input-bordered"
								required
								enterkeyhint="done"
								autocomplete="off"
							/>
						</div>
						<div class="form-control mt-6">
							<button class="btn btn-primary" class:loading={submitting} type="submit"
								>Update</button
							>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
