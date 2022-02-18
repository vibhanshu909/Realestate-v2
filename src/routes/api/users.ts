import { prisma } from '$lib/db';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get() {
	return {
		body: { data: await prisma.user.findMany({ where: { isAdmin: false } }) }
	};
}
