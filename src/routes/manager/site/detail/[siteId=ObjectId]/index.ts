import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	return {
		status: 302,
		headers: {
			location: `/manager/site/detail/${params.siteId}/1`
		}
	};
};
