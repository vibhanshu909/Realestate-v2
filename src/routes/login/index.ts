import { prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';
import * as bcrypt from 'bcryptjs';
import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';

export const post: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.formData();
		console.log(formData);
		const username = formData.get('username') as string,
			password = formData.get('password') as string;
		console.log(username, password);
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
							httpOnly: true,
							secure: true,
							maxAge: 60 * 60 * 24 * 365 // 1 year
						})
					}
				};
			} else {
				return { status: 400, errors: ['Invalid Password'] };
			}
		} else {
			console.log('inside 400 error block');
			return { status: 400, body: { errors: ['User does not exists'] } };
		}
	} catch (error) {
		return { status: 500, body: { errors: ['Some unexpected error occurred!'] } };
	}
};
