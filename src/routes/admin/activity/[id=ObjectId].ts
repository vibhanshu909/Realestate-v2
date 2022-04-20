import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	if (params?.id) {
		const activity = await prisma.activity.findFirst({
			where: {
				id: params.id
			}
		});
		return {
			status: 200,
			body: {
				activity
			}
		};
	} else {
		return {
			status: 404,
			body: {
				error: 'Activity not found'
			}
		};
	}
};
