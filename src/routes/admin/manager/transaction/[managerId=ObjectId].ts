import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

const take = 50;

export const get: RequestHandler = async ({ params, url }) => {
	const page = Number(url.searchParams.get('page')) || 1;

	if (params?.managerId) {
		const [transactions, transactionCount] = await Promise.all([
			prisma.history.findMany({
				where: {
					userId: params.managerId
				},
				orderBy: {
					createdAt: 'desc'
				},
				take,
				skip: (page - 1) * take
			}),
			prisma.history.count({
				where: {
					userId: params.managerId
				}
			})
		]);
		return {
			status: 200,
			body: {
				transactions,
				pageCount: Math.ceil(transactionCount / take),
				page
			}
		};
	} else {
		return {
			status: 500,
			body: {
				errors: ['Manager ID is required']
			}
		};
	}
};
