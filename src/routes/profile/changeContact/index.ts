import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	const { user }: { user: User } = locals as any;

	try {
		// const user = await prisma.user.findFirst({ where: { id: locals?.user?.id } });
		if (user) {
			return {
				status: 200,
				body: {
					contact: user.contact
				}
			};
		} else {
			return { status: 400, body: { errors: ['User does not exists'] } };
		}
	} catch (error) {
		console.error(error);

		return { status: 500, body: { errors: ['Some unexpected error occurred!'] } };
	}
};

export const post: RequestHandler = async ({ request, locals }) => {
	const { user }: { user: User } = locals as any;
	try {
		const formData = await request.formData();
		const contact = formData.get('contact') as string;
		if (contact.length === 10) {
			await prisma.$transaction([
				prisma.user.update({
					where: {
						id: user?.id
					},
					data: {
						contact: BigInt(contact)
					}
				}),
				performActivity({
					user,
					activity: 'Change contact',
					formData,
					result: {}
				})
			]);
			return {
				status: 302,
				headers: {
					location: '/'
				}
			};
		} else {
			return { status: 400, body: { errors: ['Contact number validation failed'] } };
		}
	} catch (error) {
		console.error(error);
		return { status: 500, body: { errors: ['Some unexpected error occurred!'] } };
	}
};
