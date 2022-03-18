import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';

export const post: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const username = formData.get('username') as string,
			password = formData.get('password') as string,
			totalReceivedAmount = BigInt((formData.get('totalReceivedAmount') || 0) as any),
			contact = BigInt((formData.get('contact') || 0) as any);

		if (username && password) {
			await prisma.user.create({
				data: {
					username,
					password: bcrypt.hashSync(password),
					contact,
					totalReceivedAmount,
					balance: totalReceivedAmount
				}
			});
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
					errors: ['Username and password are required']
				}
			};
		}
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
