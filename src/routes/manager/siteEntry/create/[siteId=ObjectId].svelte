<script lang="ts" context="module">
	export type Payload =
		| { [key in keyof SitesTotal]: Omit<SiteEntryItem, 'quantity'> }
		| {
				other: Omit<SiteEntryItem, 'quantity'>;
				other2: Omit<SiteEntryItem, 'quantity'>;
		  };
</script>

<script lang="ts">
	import { kconstants } from '$lib/kconstants';
	import Input from '$lib/manager/siteEntry/Input.svelte';
	import { toCurrency } from '$lib/toCurrency';
	import type { Site, SiteEntryItem, SitesTotal } from '@prisma/client';
	export let site: Site;
	export let errors: string[] = [];

	const payload: Payload = {} as any;

	let submitting = false;
	let form: HTMLFormElement;
	const total: {
		total: bigint;
		managerSpentAmount: bigint;
	} = {
		managerSpentAmount: 0n,
		total: 0n
	} as any;
	function calc(e: CustomEvent<{ name: keyof typeof payload; cost: bigint; paid: boolean }>) {
		const { name, ...rest } = e.detail;
		payload[name] = { ...rest };
	}
	$: {
		total.total = 0n;
		total.managerSpentAmount = 0n;

		Object.keys(payload).forEach((name) => {
			total.total += payload[name].cost;
			payload[name].paid && (total.managerSpentAmount += payload[name].cost);
		});
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content w-full flex-col lg:flex-row-reverse">
		<div class="card w-full max-w-sm flex-shrink-0 bg-base-100 shadow-2xl">
			<div class="card-body">
				<h1 class="text-center text-2xl">Create Site Entry</h1>
				<p class="text-center text-secondary">({site?.name})</p>
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
						// for (let [key, value] of new FormData(document.forms[0]).entries()) {
						// 	console.log(`${key}: ${value}`);
						// }
						submitting = true;
						form.submit();
					}}
				>
					<fieldset disabled={submitting}>
						<div class="flex w-full flex-col">
							<Input name="mistri" on:calc={calc} autofocus />
							<div class="divider" />

							<Input name="labour" on:calc={calc} />
							<div class="divider" />

							<Input name="eit" on:calc={calc} />
							<div class="divider" />

							<Input name="morang" on:calc={calc} />
							<div class="divider" />

							<Input name="baalu" on:calc={calc} />
							<div class="divider" />

							<Input name="githi" on:calc={calc} />
							<div class="divider" />

							<Input name="cement" on:calc={calc} />
							<div class="divider" />

							<Input name="saria" on:calc={calc} />
							<div class="divider" />

							<Input name="dust" on:calc={calc} />
							<div class="divider" />

							<Input name="other" on:calc={calc} quantityType="text" />
							<div class="divider" />

							<Input name="other2" on:calc={calc} label="Other 2" quantityType="text" />
							<div class="divider" />

							<div class="form-control">
								<label class="label" for="note">
									<span class="label-text">Note</span>
								</label>
								<input
									name="note"
									type="text"
									placeholder="Note"
									class="input input-bordered"
									enterkeyhint="done"
									autocomplete="off"
								/>
							</div>

							<div class="form-control mt-6">
								<div class="my-3 flex flex-col gap-1">
									<div>
										<span>Manager Spent Amount({kconstants.currencySymbol}): </span><span
											class="text-lg text-accent">{toCurrency(total.managerSpentAmount)}</span
										>
									</div>
									<div>
										<span>Total Cost({kconstants.currencySymbol}): </span><span
											>{toCurrency(total.total)}</span
										>
									</div>
								</div>
								<button class="btn btn-primary" class:loading={submitting} type="submit"
									>Create</button
								>
							</div>
						</div>
					</fieldset>
				</form>
			</div>
		</div>
	</div>
</div>
