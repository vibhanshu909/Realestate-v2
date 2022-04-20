import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

const take = 50;

export const get: RequestHandler = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const [activities, activityCount] = await Promise.all([
		prisma.activity.findMany({
			orderBy: { createdAt: 'desc' },
			take,
			skip: (page - 1) * take
		}),
		prisma.activity.count()
	]);
	return {
		status: 200,
		body: {
			activities,
			superAdmin: Boolean(url.searchParams.get('superAdmin') === ''),
			pageCount: Math.ceil(activityCount / take),
			page
		}
	};
};
