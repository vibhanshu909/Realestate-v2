<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session && session.isAdmin) {
			return {
				status: 302,
				redirect: '/admin'
			};
		} else {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
	};
</script>
