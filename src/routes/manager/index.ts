import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	const [siteCount, sites] = await Promise.all([
		await prisma.site.count({ where: { managerId: locals.user.id } }),
		await prisma.site.findMany({
			where: { managerId: locals.user.id, isDeleted: false },
			orderBy: { createdAt: 'desc' },
			include: {
				_count: { select: { siteEntries: true } }
			}
		})
	]);
	return {
		status: 200,
		body: {
			user: locals.user,
			siteCount,
			sites
		}
	};
};
