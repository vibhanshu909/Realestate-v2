import { PrismaClient } from '@prisma/client';

BigInt.prototype['toJSON'] = function () {
	return this.toString();
};

export const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error']
});
