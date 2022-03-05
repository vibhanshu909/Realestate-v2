import { prisma } from '$lib/db';
import type { IToken } from '$lib/types';
import type { GetSession, Handle } from '@sveltejs/kit';
import cookie from 'cookie';
import jwt from 'jsonwebtoken';

const resetCookie = cookie.serialize('userToken', '', {
	path: '/',
	httpOnly: true,
	secure: true,
	sameSite: 'lax',
	maxAge: -1
});

const redirectToLogin = new Response(null, {
	status: 302,
	headers: {
		location: '/auth/login',
		'set-cookie': resetCookie
	}
});

export const handle: Handle = async ({ event, resolve }) => {
	const cookies =
		event.request.headers.get('cookie') && cookie.parse(event.request.headers.get('cookie'));

	if (event.url.pathname.startsWith('/auth/')) {
		return await resolve(event);
	} else if (cookies && 'userToken' in cookies) {
		try {
			const { id: userId } = jwt.verify(cookies.userToken, process.env.SECRET, {
				maxAge: '1y'
			}) as IToken;
			const user = await prisma.user.findFirst({
				where: { id: userId },
				select: {
					id: true,
					username: true,
					isAdmin: true,
					totalReceivedAmount: true,
					spent: true,
					balance: true,
					contact: true,
					createdAt: true,
					updatedAt: true
				}
			});
			if (user) {
				if (
					(event.url.pathname.startsWith('/admin') && !user.isAdmin) ||
					(event.url.pathname.startsWith('/manager') && user.isAdmin)
				) {
					return new Response('Not Found', {
						status: 404
					});
				}
				event.locals.user = user;
				const token = jwt.sign(
					{ id: user.id, username: user.username, isAdmin: user.isAdmin },
					process.env.SECRET,
					{
						expiresIn: '1y'
					}
				);
				const newCookie = cookie.serialize('userToken', token, {
					path: '/',
					httpOnly: true,
					secure: true,
					sameSite: 'lax',
					maxAge: 60 * 60 * 24 * 365 // 1 year
				});
				const response = await resolve(event);
				response.headers.set('set-cookie', newCookie);
				return response;
			} else {
				return redirectToLogin;
			}
		} catch (e) {
			console.error(e);
			return redirectToLogin;
		}
	} else {
		return redirectToLogin;
	}
};

export const getSession: GetSession = (event) => {
	return event.locals.user
		? {
				id: event.locals.user.id,
				username: event.locals.user.username,
				isAdmin: event.locals.user.isAdmin
		  }
		: null;
};
