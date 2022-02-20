import type { RequestHandler } from '@sveltejs/kit';
import * as cookie from 'cookie';

export const get: RequestHandler = async () => {
	return {
		status: 302,
		headers: {
			location: '/login',
			'set-cookie': cookie.serialize('userToken', '', { maxAge: 0, expires: new Date(0) })
		}
	};
};
