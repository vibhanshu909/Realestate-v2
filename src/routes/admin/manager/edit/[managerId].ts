import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: { id: params?.managerId },
		select: {
			username: true
		}
	});

	return {
		status: 200,
		body: user
	};
};

export const post: RequestHandler = async ({ params, request }) => {
	if (params?.managerId) {
		try {
			const formData = await request.formData();
			const username = formData.get('username') as string;
			if (username) {
				await prisma.user.update({
					where: {
						id: params.managerId
					},
					data: {
						username
					}
				});
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
