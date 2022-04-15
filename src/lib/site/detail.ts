import { prisma } from '$lib/db';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, locals }) => {
	const user: User = (locals as any).user;
	if (!params?.siteId) {
		return {
			status: 404,
			body: {
				error: 'Site not found'
			}
		};
	} else {
		const site = await prisma.site.findFirst({
			where: {
				id: params.siteId,
				...(user.isAdmin ? {} : { managerId: user.id })
			},
			include: {
				manager: true
			}
		});
		return {
			status: 200,
			body: {
				site,
				totalEntries: await prisma.siteEntry.count({
					where: {
						siteId: site.id
					}
				}),
				entries: await prisma.siteEntry.findMany({
					where: {
						siteId: site.id
					},
					orderBy: {
						createdAt: 'desc'
					},
					take: 10
				})
			}
		};
	}
};
