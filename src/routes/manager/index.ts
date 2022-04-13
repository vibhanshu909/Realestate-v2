import { prisma } from '$lib/db';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	const user: User = (locals as any).user;
	const [siteCount, sites] = await Promise.all([
		await prisma.site.count({ where: { managerId: user.id } }),
		await prisma.site.findMany({
			where: { managerId: user.id, isDeleted: false },
			orderBy: { createdAt: 'desc' },
			include: {
				_count: { select: { siteEntries: true } }
			}
		})
	]);
	return {
		status: 200,
		body: {
			user: user,
			siteCount,
			sites
		}
	};
};
