import type { User } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ locals }) => {
	const session: Omit<User, 'password'> = locals.user;
	if (session) {
		if (session.isAdmin) {
			return {
				status: 302,
				headers: {
					location: '/admin'
				}
			};
		}
		return {
			status: 302,
			headers: {
				location: '/manager'
			}
		};
	} else {
		return {
			status: 302,
			headers: {
				location: '/auth/login'
			}
		};
	}
};
