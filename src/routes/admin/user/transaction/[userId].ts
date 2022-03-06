import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	if (params?.userId) {
		return {
			status: 200,
			body: {
				transactions: await prisma.history.findMany({
					where: {
						userId: params.userId
					},
					orderBy: {
						createdAt: 'desc'
					},
					take: 50
				})
			}
		};
	} else {
		return {
			status: 500,
			body: {
				errors: ['User ID is required']
			}
		};
	}
};
