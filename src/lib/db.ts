import pkg from '@prisma/client';

const { PrismaClient, HistoryType } = pkg;
BigInt.prototype['toJSON'] = function () {
	return this.toString();
};

export const prisma = new PrismaClient({
	log: [
		{
			emit: 'event',
			level: 'query'
		}
	]
});
prisma.$on('query', (e) => console.log('\n', e.query, '\n'));

export { HistoryType };
