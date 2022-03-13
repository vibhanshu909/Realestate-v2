import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	if (params?.managerId) {
		if (
			await prisma.user.delete({
				where: {
					id: params.managerId
				}
			})
		) {
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
					errors: ['Invalid manager id']
				}
			};
		}
	} else {
		return {
			status: 400,
			body: {
				errors: ['Manager id required']
			}
		};
	}
};
