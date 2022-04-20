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

export const post: RequestHandler = async ({ params, request, locals, url }) => {
	const { user }: { user: User } = locals as any;
	try {
		const site = await prisma.site.findFirst({ where: { id: params?.siteId } });
		if (site) {
			const formData = await request.formData();
			const siteEntry: Prisma.SiteEntryCreateInput & { total: bigint; managerSpentAmount: bigint } =
				{
					site: {
						connect: { id: params.siteId }
					},
					managerSpentAmount: 0n,
					total: 0n
				} as any;
			for (let item of formData.entries()) {
				const [key, value] = item;
				switch (key) {
					case 'note':
						siteEntry.note = value;
						break;
					default:
						const [field, subfield] = key.split('.');
						!siteEntry[field] && (siteEntry[field] = {});
						switch (field) {
							case 'other':
							case 'other2':
								switch (subfield) {
									case 'paid':
										siteEntry[field].paid = true;
										siteEntry.managerSpentAmount += siteEntry[field].cost;
										break;
									case 'cost':
										siteEntry[field].cost = BigInt(value);
										siteEntry.total += siteEntry[field].cost;
										site.total[field] += siteEntry[field].cost;
										break;
									case 'quantity':
										siteEntry[field].quantity = value;
										break;
								}
								break;
							default:
								switch (subfield) {
									case 'paid':
										siteEntry[field].paid = true;
										siteEntry.managerSpentAmount += siteEntry[field].cost;
										break;
									case 'cost':
										siteEntry[field].cost = BigInt(value);
										siteEntry.total += siteEntry[field].cost;
										site.total[field].cost += siteEntry[field].cost;
										break;
									case 'quantity':
										siteEntry[field].quantity = BigInt(value);
										site.total[field].quantity += siteEntry[field].quantity;
										break;
								}
						}
				}
			}
			if (siteEntry.total === 0n) {
				return {
					status: 400,
					body: {
						errors: ['Total cost must be greater than 0']
					}
				};
			}
			await prisma.$transaction([
				prisma.siteEntry.create({
					data: siteEntry
				}),
				prisma.user.update({
					where: {
						id: user.id
					},
					data: {
						spent: user.spent + (siteEntry.managerSpentAmount as bigint),
						balance: user.balance - (siteEntry.managerSpentAmount as bigint),
						history: {
							create: {
								amount: siteEntry.managerSpentAmount,
								type: HistoryType.DEBIT,
								balance: user.balance - (siteEntry.managerSpentAmount as bigint),
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
						managerSpentAmount: site.managerSpentAmount + (siteEntry.managerSpentAmount as bigint),
						cost: site.cost + (siteEntry.total as bigint),
						total: site.total
					}
				}),
				performActivity({
					user,
					activity: 'Create Site Entry',
					params,
					formData,
					result: {}
				})
			]);
			return {
				status: 302,
				headers: {
					location: user.isAdmin ? '/admin' : url.searchParams.get('redirect') || '/'
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
