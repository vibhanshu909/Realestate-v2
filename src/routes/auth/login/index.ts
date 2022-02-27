import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

export const post: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		const username = formData.get('username') as string,
			password = formData.get('password') as string;
		const user = await prisma.user.findFirst({ where: { username } });
		if (user) {
			const isPasswordCorrect = await bcrypt.compare(password, user.password);
			if (isPasswordCorrect) {
				const { id } = user;
				const token = jwt.sign(
					{ id, username: user.username, isAdmin: user.isAdmin },
					process.env.SECRET,
					{
						expiresIn: '1y'
					}
				);
				return {
					status: 302,
					headers: {
						location: '/',
						'set-cookie': cookie.serialize('userToken', token, {
							path: '/',
							httpOnly: true,
							secure: true,
							maxAge: 60 * 60 * 24 * 365 // 1 year
						})
					}
				};
			} else {
				return {
					status: 400,
					body: {
						errors: ['Invalid Password']
					}
				};
			}
		} else {
			return {
				status: 400,
				body: {
					errors: ['User does not exists']
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
