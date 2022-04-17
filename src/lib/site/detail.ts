import { prisma } from '$lib/db';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

const take = 10;

export const get: RequestHandler = async ({ params, locals }) => {
	const user: User = (locals as any).user;
	if (params?.siteId && params?.page) {
		const page = Number(params.page);
		const site = await prisma.site.findFirst({
			where: {
				id: params.siteId,
				...(user.isAdmin ? {} : { managerId: user.id })
			},
			include: {
				manager: true
			}
		});
		const [totalEntries, entries] = await Promise.all([
			prisma.siteEntry.count({
				where: {
					siteId: site.id
				}
			}),
			prisma.siteEntry.findMany({
				where: {
					siteId: site.id
				},
				orderBy: {
					createdAt: 'desc'
				},
				take,
				skip: take * (page - 1)
			})
		]);
		return {
			status: 200,
			body: {
				page,
				pageCount: Math.ceil(totalEntries / take),
				site,
				totalEntries,
				entries
			}
		};
	} else {
		return {
			status: 404,
			body: {
				error: 'Site not found'
			}
		};
	}
};
