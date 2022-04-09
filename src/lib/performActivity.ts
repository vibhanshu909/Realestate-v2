import type { Prisma, User } from '@prisma/client';
import { prisma } from './db';

export const performActivity = (
	params: { user: Pick<User, 'username'> } & Pick<
		Prisma.ActivityCreateInput,
		'activity' | 'arguments' | 'result'
	>
) => {
	const { user, ...rest } = params;
	return prisma.activity.create({
		data: {
			username: user.username,
			...rest
		}
	});
};
