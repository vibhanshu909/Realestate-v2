import { prisma } from '$lib/db';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const take = 10;

export const get: (manager?: User) => RequestHandler =
	(manager: User) =>
	async ({ locals, url }) => {
		const page = Number(url.searchParams.get('page') || '1');
		const user: User = manager || (locals as any).user;
		const [siteCount, sites] = await Promise.all([
			prisma.site.count({ where: { managerId: user.id } }),
			prisma.site.findMany({
				where: { managerId: user.id, isDeleted: false },
				orderBy: { updatedAt: 'desc' },
				include: {
					_count: { select: { siteEntries: true } }
				},
				take,
				skip: take * (page - 1)
			})
		]);
		return {
			status: 200,
			body: {
				pageCount: Math.ceil(siteCount / take),
				page,
				user: user,
				siteCount,
				sites
			}
		};
	};
