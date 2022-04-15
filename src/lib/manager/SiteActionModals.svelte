<script lang="ts">
	import { portal } from '$lib/actions';
	import type { Site } from '@prisma/client';
	export let site: Pick<Site, 'id' | 'name'>;
	export let redirect: string = '/manager';
</script>

<div use:portal={'modal'}>
	<input type="checkbox" id={site.id} class="modal-toggle" />
	<label for={site.id} class="modal cursor-pointer">
		<label class="modal-box relative ring ring-secondary" for="">
			<div class="my-2 text-center">
				<h1 class="text-2xl text-secondary">Actions</h1>
				<p class="text-xs">({site.name})</p>
			</div>
			<ul class="menu bg-base-100">
				<li>
					<a href={`/manager/site/detail/${site.id}`} class="site-view">
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
						View</a
					>
				</li>
				<li>
					<a
						href={`/manager/siteEntry/create/${site.id}?redirect=${redirect}`}
						class="site-add-entry"
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
								d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						Add Entry</a
					>
				</li>
			</ul>
		</label>
	</label>
</div>
