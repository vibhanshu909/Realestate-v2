import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	return {
		status: 200,
		body: {
			managers: await prisma.user.findMany({
				where: {
					isAdmin: false
				},
				orderBy: {
					createdAt: 'desc'
				}
			})
		}
	};
};

export const post: RequestHandler = async ({ request, locals }) => {
	const { user }: { user: User } = locals as any;
	try {
		const formData = await request.formData();
		const name = formData.get('name') as string,
			location = formData.get('location') as string,
			managerId = formData.get('managerId') as string,
			createdAt = formData.get('createdAt') as string;
		if (!name || !location || !managerId || !createdAt) {
			return {
				status: 500,
				body: {
					errors: ['All fields are required']
				}
			};
		}
		const manager = await prisma.user.findFirst({ where: { id: managerId } });
		if (manager) {
			const totalItemDefault = {
				cost: 0n,
				quantity: 0n
			};
			await prisma.$transaction([
				prisma.site.create({
					data: {
						name,
						location,
						manager: { connect: { id: managerId } },
						createdAt: new Date(createdAt),
						isDeleted: false,
						managerSpentAmount: 0n,
						cost: 0n,
						total: {
							set: {
								mistri: totalItemDefault,
								labour: totalItemDefault,
								eit: totalItemDefault,
								morang: totalItemDefault,
								baalu: totalItemDefault,
								githi: totalItemDefault,
								cement: totalItemDefault,
								saria: totalItemDefault,
								dust: totalItemDefault,
								other: 0n,
								other2: 0n
							}
						}
					}
				}),
				performActivity({
					user,
					activity: 'Create Site',
					arguments: {},
					result: {}
				})
			]);
			return {
				status: 302,
				headers: {
					location: '/admin/sites/1'
				}
			};
		} else {
			return {
				status: 400,
				body: {
					errors: ['Manager does not exists']
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
