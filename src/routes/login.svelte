<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	let username: string;
	let password: string;
	let submitting = false;
</script>

<Navbar user={{ isAdmin: false, username: 'admin' }} />
<div class="hero min-h-screen bg-base-200">
	<div class="flex-col hero-content lg:flex-row-reverse w-full">
		<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
			<div class="card-body">
				<form
					on:submit={async (e) => {
						try {
							submitting = true;
							e.preventDefault();
							const res = await fetch('/api/login', {
								method: 'post',
								body: JSON.stringify({ username, password })
							});
							const result = await res.json();
							console.log(result);
						} catch (error) {
							console.error(error);
						} finally {
							submitting = false;
						}
					}}
				>
					<fieldset disabled={submitting}>
						<div class="form-control">
							<label class="label" for="">
								<span class="label-text">Username</span>
							</label>
							<input
								bind:value={username}
								name="username"
								type="text"
								placeholder="username"
								class="input input-bordered"
							/>
						</div>
						<div class="form-control">
							<label class="label" for="password">
								<span class="label-text">Password</span>
							</label>
							<input
								bind:value={password}
								type="password"
								placeholder="password"
								class="input input-bordered"
							/>
						</div>
						<div class="form-control mt-6">
							<button class="btn btn-primary" class:loading={submitting} type="submit">Login</button
							>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
