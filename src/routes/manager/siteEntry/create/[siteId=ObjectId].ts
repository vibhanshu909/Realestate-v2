import { HistoryType, prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { Prisma, User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	if (params?.siteId) {
		return {
			status: 200,
			body: {
				site: await prisma.site.findFirst({
					where: {
						id: params.siteId
					}
				})
			}
		};
	} else {
		return {
			status: 400,
			body: {
				error: 'Access Denied for this site'
			}
		};
	}
};

export const post: RequestHandler = async ({ params, request, locals }) => {
	const { user }: { user: User } = locals as any;
	try {
		const site = await prisma.site.findFirst({ where: { id: params?.siteId } });
		if (site) {
			const formData = await request.formData();
			const data: Prisma.SiteEntryCreateInput = {
				site: {
					connect: { id: params.siteId }
				},
				managerSpentAmount: 0n,
				total: 0n
			} as any;
			for (let item of formData.entries()) {
				const [key, value] = item;
				if (key === 'note') {
					data.note = value;
					continue;
				}
				const [field, subfield] = key.split('.');
				if (subfield === 'paid') {
					data[field][subfield] = true;
					data.managerSpentAmount = (data.managerSpentAmount as bigint) + BigInt(data[field].cost);
				} else {
					data[field][subfield] = BigInt(value);
					site.total[field][subfield] += data[field][subfield];
					if (subfield === 'cost') {
						data.total = (data.total as bigint) + BigInt(value);
					}
				}
			}
			await prisma.$transaction([
				prisma.siteEntry.create({
					data
				}),
				prisma.user.update({
					where: {
						id: user.id
					},
					data: {
						spent: user.spent + (data.managerSpentAmount as bigint),
						balance: user.balance - (data.managerSpentAmount as bigint),
						history: {
							create: {
								amount: data.managerSpentAmount,
								type: HistoryType.DEBIT,
								balance: user.balance - (data.managerSpentAmount as bigint),
								note: `For: "${site.name}"`
							}
						}
					}
				}),
				prisma.site.update({
					where: {
						id: site.id
					},
					data: {
						total: site.total
					}
				}),
				performActivity({
					user,
					activity: 'Create Site Entry',
					arguments: params,
					result: {}
				})
			]);
			return {
				status: 302,
				headers: {
					location: '/admin'
				}
			};
		} else {
			return {
				status: 400,
				body: {
					errors: ['Site does not exists']
				}
			};
		}
	} catch (error) {
		console.error(error);
		return {
			status: 500,
			body: {
				errors: ['Some unexpected error occurred!']
			}
		};
	}
};
