import type { Prisma, User } from '@prisma/client';
import { prisma } from './db';

interface IPerformActivityProps extends Pick<Prisma.ActivityCreateInput, 'activity' | 'result'> {
	user: Pick<User, 'username'>;
	params?: Record<string, string>;
	formData?: FormData;
}
export const performActivity = (props: IPerformActivityProps) => {
	const { user, params, formData, ...rest } = props;
	return prisma.activity.create({
		data: {
			username: user.username,
			arguments: {
				...(params ? { params } : {}),
				...(formData ? { formData: Array.from(formData.entries()) } : {})
			},
			...rest
		}
	});
};
