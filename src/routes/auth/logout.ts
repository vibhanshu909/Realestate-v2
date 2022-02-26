import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const get: RequestHandler = async () => {
	return {
		status: 302,
		headers: {
			location: '/auth/login',
			'set-cookie': cookie.serialize('userToken', '', {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'lax',
				maxAge: -1
			})
		}
	};
};
