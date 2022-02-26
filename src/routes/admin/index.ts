import { prisma } from '$lib/db';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			users: await new Promise<
				(User & {
					_count: {
						sites: number;
					};
					totalSitesCost: bigint;
				})[]
			>(async (resolve, reject) => {
				try {
					const users = await prisma.user.findMany({
						where: { isAdmin: false },
						orderBy: { createdAt: 'desc' },
						include: { _count: { select: { sites: true } } }
					});
					const sites = await prisma.site.findMany({
						where: { managerId: { in: users.map((u) => u.id) } }
					});
					resolve(
						users.map((user) => {
							const totalSitesCost = sites
								.filter((site) => site.managerId === user.id)
								.reduce((prev, cur) => prev + cur.cost, 0n);
							return { ...user, totalSitesCost };
						})
					);
				} catch (error) {
					reject(error);
				}
			})
		}
	};
};
