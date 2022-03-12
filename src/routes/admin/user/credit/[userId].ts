import { prisma } from '$lib/db';
import { HistoryType } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async ({ params }) => {
	const user = await prisma.user.findFirst({
		where: { id: params.userId },
		select: {
			username: true
		}
	});

	return {
		status: 200,
		body: user
	};
};

export const post: RequestHandler = async ({ params, request, locals }) => {
	if (params?.userId) {
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
			const note = formData.get('note') as string;
			const balance =
				amount +
				BigInt(
					(
						await prisma.history.findFirst({
							where: { userId: params.userId },
							orderBy: { createdAt: 'desc' }
						})
					)?.balance ?? 0
				);
			await prisma.history.create({
				data: {
					userId: params.userId,
					amount,
					note,
					type: HistoryType.CREDIT,
					balance
				}
			});
			await prisma.user.update({
				where: {
					id: params.userId
				},
				data: {
					totalReceivedAmount: locals?.user.totalReceivedAmount + amount,
					balance: locals?.user.balance + amount
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
				errors: ['User ID is required']
			}
		};
	}
};
