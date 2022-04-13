import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

const take = 10;

export const get: RequestHandler = async ({ params }) => {
	if (params?.page) {
		const page = Number(params?.page);
		const [siteCount, sites] = await Promise.all([
			prisma.site.count({
				where: { isDeleted: false }
			}),
			prisma.site.findMany({
				where: { isDeleted: false },
				orderBy: { updatedAt: 'desc' },
				include: {
					manager: { select: { username: true } },
					_count: { select: { siteEntries: true } }
				},
				take,
				skip: take * (page - 1)
			})
		]);
		if (sites.length) {
			return {
				status: 200,
				body: {
					pageCount: Math.ceil(siteCount / take),
					page,
					sites
				}
			};
		} else {
			return {
				status: 400,
				body: {
					errors: ['Invalid page number!']
				}
			};
		}
	} else {
		return {
			status: 400,
			body: {
				errors: ['No page found!']
			}
		};
	}
};
