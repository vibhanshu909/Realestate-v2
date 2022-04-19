import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, locals }) => {
	const { user }: { user: User } = locals as any;
	if (params?.managerId) {
		if (
			await prisma.$transaction([
				prisma.user.delete({
					where: {
						id: params.managerId
					}
				}),
				performActivity({
					user,
					activity: 'Delete Manager',
					params,
					result: {}
				})
			])
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
