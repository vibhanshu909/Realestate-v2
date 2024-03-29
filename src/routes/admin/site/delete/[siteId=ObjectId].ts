import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params, locals, url }) => {
	const { user }: { user: User } = locals as any;
	if (params?.siteId) {
		if (
			await prisma.$transaction([
				prisma.site.update({
					where: {
						id: params.siteId
					},
					data: {
						isDeleted: true
					}
				}),
				performActivity({
					user,
					activity: 'Delete Site',
					params,
					result: {}
				})
			])
		) {
			return {
				status: 302,
				headers: {
					location: `/admin/sites/${url.searchParams.get('page') || '1'}`
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
