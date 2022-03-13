import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	if (params?.siteId) {
		if (
			await prisma.site.delete({
				where: {
					id: params.siteId
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
