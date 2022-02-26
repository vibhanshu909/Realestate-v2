import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			sites: await prisma.site.findMany({
				where: { isDeleted: false },
				orderBy: { createdAt: 'desc' },
				include: {
					manager: { select: { username: true } },
					_count: { select: { siteEntries: true } }
				}
			})
		}
	};
};
