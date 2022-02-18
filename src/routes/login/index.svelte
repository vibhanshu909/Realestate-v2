<script lang="ts">
	import { session } from '$app/stores';
	import Navbar from '$lib/Navbar.svelte';

	export let errors: string[] = [];
	let submitting = false;
	let form: HTMLFormElement;
</script>

<Navbar user={$session} />
<div class="pt-20">
	{#each errors as error}
		<div class="alert alert-error shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Error! {error}</span>
			</div>
		</div>
	{/each}
	<div class="hero min-h-screen bg-base-200">
		<div class="hero-content w-full flex-col lg:flex-row-reverse">
			<div class="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
				<div class="card-body">
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
								<label class="label" for="">
									<span class="label-text">Username</span>
								</label>
								<input
									name="username"
									type="text"
									placeholder="username"
									class="input-bordered input"
								/>
							</div>
							<div class="form-control">
								<label class="label" for="password">
									<span class="label-text">Password</span>
								</label>
								<input
									name="password"
									type="password"
									placeholder="password"
									class="input-bordered input"
								/>
							</div>
							<div class="form-control mt-6">
								<button class="btn btn-primary" class:loading={submitting} type="submit"
									>Login</button
								>
							</div>
						</fieldset>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
