import { prisma } from '$lib/db';
import type { Prisma } from '@prisma/client';
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

export const post: RequestHandler = async ({ params, request }) => {
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
					if (subfield === 'cost') {
						data.total = (data.total as bigint) + BigInt(value);
					}
				}
			}
			await prisma.siteEntry.create({
				data
			});
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
