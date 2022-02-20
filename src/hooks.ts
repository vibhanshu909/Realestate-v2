import { prisma } from '$lib/db';
import type { IToken } from '$lib/types';
import type { GetSession, Handle } from '@sveltejs/kit';
import * as cookie from 'cookie';
import * as jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const cookies =
		event.request.headers.get('cookie') && cookie.parse(event.request.headers.get('cookie'));
	if (cookies && 'userToken' in cookies) {
		if (event.url.pathname === '/logout') {
			return await resolve(event);
		} else {
			try {
				const { id: userId } = jwt.verify(cookies.userToken, process.env.SECRET, {
					maxAge: '1y'
				}) as IToken;
				const user = await prisma.user.findFirst({ where: { id: userId } });
				if (user) {
					event.locals.user = user;
					const token = jwt.sign(
						{ id: user.id, username: user.username, isAdmin: user.isAdmin },
						process.env.SECRET,
						{
							expiresIn: '1y'
						}
					);
					const newCookie = cookie.serialize('userToken', token, {
						path: '*',
						httpOnly: true,
						secure: true,
						maxAge: 60 * 60 * 24 * 365 // 1 year
					});
					if (event.url.pathname === '/login') {
						return new Response(null, {
							status: 302,
							headers: {
								location: '/',
								'set-cookie': newCookie
							}
						});
					}
					const response = await resolve(event);
					response.headers.set('set-cookie', newCookie);
					return response;
				} else {
					return new Response(null, {
						status: 302,
						headers: {
							location: '/login',
							'set-cookie': cookie.serialize('userToken', '', { maxAge: -1 })
						}
					});
				}
			} catch (e) {
				return new Response(null, {
					status: 302,
					headers: {
						location: '/login',
						'set-cookie': cookie.serialize('userToken', '', { maxAge: -1 })
					}
				});
			}
		}
	} else {
		if (event.url.pathname === '/login') {
			return await resolve(event);
		} else {
			return new Response(null, {
				status: 302,
				headers: {
					location: '/login',
					'set-cookie': cookie.serialize('userToken', '', { maxAge: -1 })
				}
			});
		}
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
