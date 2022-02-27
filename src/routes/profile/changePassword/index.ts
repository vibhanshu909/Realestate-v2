import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcryptjs';

export const post: RequestHandler = async ({ request, locals }) => {
	try {
		const formData = await request.formData();
		const currentPassword = formData.get('currentPassword') as string,
			newPassword = formData.get('newPassword') as string,
			newPassword2 = formData.get('newPassword2') as string;
		if (newPassword !== newPassword2) {
			return {
				status: 400,
				body: {
					errors: ['New passwords do not match']
				}
			};
		}

		const user = await prisma.user.findFirst({ where: { id: locals?.user?.id } });
		if (user) {
			const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
			if (isPasswordCorrect) {
				const hashedPassword = await bcrypt.hash(newPassword, 10);
				await prisma.user.update({
					where: { id: locals?.user?.id },
					data: { password: hashedPassword }
				});
				return {
					status: 302,
					headers: {
						location: '/'
					}
				};
			} else {
				return { status: 400, errors: ['Invalid Password'] };
			}
		} else {
			return { status: 400, body: { errors: ['User does not exists'] } };
		}
	} catch (error) {
		console.error(error);

		return { status: 500, body: { errors: ['Some unexpected error occurred!'] } };
	}
};
