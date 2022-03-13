import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const get: RequestHandler = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: { id: params?.managerId },
		select: {
			username: true
		}
	});

	return {
		status: 200,
		body: user
	};
};

export const post: RequestHandler = async ({ params, request }) => {
	if (params?.managerId) {
		try {
			const formData = await request.formData();
			const newPassword = formData.get('newPassword') as string;
			const confirmNewPassword = formData.get('confirmNewPassword') as string;
			if (newPassword !== confirmNewPassword) {
				return {
					status: 500,
					body: {
						errors: ['passwords do not match']
					}
				};
			}
			const hashedPassword = await bcrypt.hash(newPassword, 10);
			await prisma.user.update({
				where: {
					id: params.managerId
				},
				data: {
					password: hashedPassword
				}
			});
			return {
				status: 302,
				headers: {
					location: `/admin`
				}
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				body: {
					errors: ['Failed to change password']
				}
			};
		}
	} else {
		return {
			status: 500,
			body: {
				errors: ['Manager ID is required']
			}
		};
	}
};
