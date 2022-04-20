import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

const take = 10;

export const get: RequestHandler = async ({ url }) => {
	const page = Number(url.searchParams.get('page')) || 1;
	const [managers, managerCount] = await Promise.all([
		prisma.user.findMany({
			where: { isAdmin: false },
			orderBy: { createdAt: 'desc' },
			include: { _count: { select: { sites: true } } },
			take,
			skip: (page - 1) * take
		}),
		prisma.user.count({
			where: { isAdmin: false }
		})
	]);

	const sites = await prisma.site.findMany({
		where: { managerId: { in: managers.map((u) => u.id) } },
		select: { managerId: true, cost: true }
	});

	return {
		status: 200,
		body: {
			managers: managers.map((manager) => {
				const totalSitesCost = sites
					.filter((site) => site.managerId === manager.id)
					.reduce((prev, cur) => prev + cur.cost, 0n);
				return { ...manager, totalSitesCost };
			}),
			pageCount: Math.ceil(managerCount / take),
			page
		}
	};
};
