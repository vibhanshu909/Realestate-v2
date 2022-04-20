import { prisma } from '$lib/db';
import { get as getHandler } from '$lib/manager/sites/index';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async (props) => {
	const { params } = props;
	if (params.managerId) {
		const manager = await prisma.user.findFirst({
			where: {
				id: params.managerId
			}
		});
		return await getHandler(manager)(props);
	}
};
