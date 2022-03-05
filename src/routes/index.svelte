<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ session }) => {
		if (session) {
			if (session.isAdmin) {
				return {
					status: 302,
					redirect: '/admin'
				};
			}
			return {
				status: 302,
				redirect: '/manager'
			};
		} else {
			return {
				status: 302,
				redirect: '/auth/login'
			};
		}
	};
</script>
