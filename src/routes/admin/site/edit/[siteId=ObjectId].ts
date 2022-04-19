import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	return {
		status: 200,
		body: {
			site: await prisma.site.findFirst({
				where: {
					id: params?.siteId
				}
			})
		}
	};
};

export const post: RequestHandler = async ({ params, request, locals, url }) => {
	const { user }: { user: User } = locals as any;
	try {
		const formData = await request.formData();
		const name = formData.get('name') as string,
			location = formData.get('location') as string;
		if (!name || !location) {
			return {
				status: 500,
				body: {
					errors: ['All fields are required']
				}
			};
		}

		await prisma.$transaction([
			prisma.site.update({
				where: { id: params?.siteId },
				data: {
					name,
					location
				}
			}),
			performActivity({
				user,
				activity: 'Edit/Update Site',
				params,
				formData,
				result: {}
			})
		]);
		return {
			status: 302,
			headers: {
				location: `/admin/sites/${url.searchParams.get('page') || '1'}`
			}
		};
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
