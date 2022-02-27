import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	try {
		const user = await prisma.user.findFirst({ where: { id: locals?.user?.id } });
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
	try {
		const formData = await request.formData();
		const contact = formData.get('contact') as string;
		if (contact.length === 10) {
			await prisma.user.update({
				where: {
					id: locals?.user?.id
				},
				data: {
					contact: BigInt(contact)
				}
			});
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
