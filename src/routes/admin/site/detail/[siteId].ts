import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
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
				id: params.siteId
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
