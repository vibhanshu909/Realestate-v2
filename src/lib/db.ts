import pkg from '@prisma/client';

const { PrismaClient } = pkg;
BigInt.prototype['toJSON'] = function () {
	return this.toString();
};

export const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error']
});
