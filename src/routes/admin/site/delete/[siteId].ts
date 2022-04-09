import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, locals }) => {
	const { user }: { user: User } = locals as any;
	if (params?.siteId) {
		if (
			await prisma.$transaction([
				prisma.site.delete({
					where: {
						id: params.siteId
					}
				}),
				performActivity({
					user,
					activity: 'Delete Site',
					arguments: params,
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
					errors: ['Invalid site id']
				}
			};
		}
	} else {
		return {
			status: 400,
			body: {
				errors: ['Site id required']
			}
		};
	}
};
