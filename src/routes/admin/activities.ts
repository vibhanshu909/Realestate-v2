import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			activities: await prisma.activity.findMany({ take: 50, orderBy: { createdAt: 'desc' } })
		}
	};
};
