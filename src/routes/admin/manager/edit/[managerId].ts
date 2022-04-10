import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: { id: params?.managerId },
		select: {
			username: true,
			contact: true
		}
	});

	return {
		status: 200,
		body: user
	};
};

export const post: RequestHandler = async ({ params, request, locals }) => {
	const { user }: { user: User } = locals as any;
	if (params?.managerId) {
		try {
			const formData = await request.formData();
			const username = formData.get('username') as string;
			const contact = BigInt(formData.get('contact') as any);
			if (username && contact) {
				await prisma.$transaction([
					prisma.user.update({
						where: {
							id: params.managerId
						},
						data: {
							username,
							contact
						}
					}),
					performActivity({
						user,
						activity: 'Edit/Update Manager',
						arguments: params,
						result: {}
					})
				]);
				return {
					status: 302,
					headers: {
						location: `/admin`
					}
				};
			} else {
				return {
					status: 500,
					body: {
						errors: ["Username can't be empty"]
					}
				};
			}
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				body: {
					errors: ['Failed to update user']
				}
			};
		}
	} else {
		return {
			status: 500,
			body: {
				errors: ['Manager ID is required']
			}
		};
	}
};
