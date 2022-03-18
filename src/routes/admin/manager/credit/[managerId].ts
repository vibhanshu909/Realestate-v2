import { HistoryType, prisma } from '$lib/db';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: { id: params?.managerId },
		select: {
			username: true
		}
	});

	return {
		status: 200,
		body: user
	};
};

export const post: RequestHandler = async ({ params, request }) => {
	if (params?.managerId) {
		try {
			const formData = await request.formData();
			const amount = BigInt(formData.get('amount') as string);
			if (amount === 0n) {
				return {
					status: 500,
					body: {
						errors: ['amount must not be zero']
					}
				};
			}
			const note = formData.get('note') as string | null;
			const manager = await prisma.user.findFirst({
				where: { id: params.managerId }
			});
			const balance =
				amount +
				BigInt(
					(
						await prisma.history.findFirst({
							where: { userId: params.managerId },
							orderBy: { createdAt: 'desc' }
						})
					)?.balance ?? 0
				);
			await prisma.history.create({
				data: {
					userId: params.managerId,
					amount,
					note,
					type: HistoryType.CREDIT,
					balance
				}
			});
			await prisma.user.update({
				where: {
					id: params.managerId
				},
				data: {
					totalReceivedAmount: manager.totalReceivedAmount + amount,
					balance: manager.balance + amount
				}
			});
			return {
				status: 302,
				headers: {
					location: `/admin`
				}
			};
		} catch (error) {
			console.error(error);
			return {
				status: 500,
				body: {
					errors: ['Failed to credit user']
				}
			};
		}
	} else {
		return {
			status: 500,
			body: {
				errors: ['Manager ID is required']
			}
		};
	}
};
