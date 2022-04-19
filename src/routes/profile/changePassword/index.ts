import { prisma } from '$lib/db';
import { performActivity } from '$lib/performActivity';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

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
				await prisma.$transaction([
					prisma.user.update({
						where: { id: user?.id },
						data: { password: hashedPassword }
					}),
					performActivity({
						user,
						activity: 'Change Password',
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
				return { status: 400, body: { errors: ['Current password is invalid'] } };
			}
		} else {
			return { status: 400, body: { errors: ['User does not exists'] } };
		}
	} catch (error) {
		console.error(error);

		return { status: 500, body: { errors: ['Some unexpected error occurred!'] } };
	}
};
