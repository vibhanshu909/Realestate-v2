import { MongoClient, ServerApiVersion } from 'mongodb';

const uri =
	'mongodb+srv://realestate_developer:$pandey909@defaultcluster.35fsk.mongodb.net/realestate_dev?retryWrites=true&w=majority';
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1, loggerLevel: 'debug' });

await client.connect();
const session = client.startSession();
// Step 2: Optional. Define options to use for the transaction
const transactionOptions = {
	readPreference: 'primary',
	readConcern: { level: 'local' },
	writeConcern: { w: 'majority' }
};
// Step 3: Use withTransaction to start a transaction, execute the callback, and commit (or abort on error)
// Note: The callback for withTransaction MUST be async and/or return a Promise.
try {
	await session.withTransaction(async () => {
		const db = client.db('realestate_dev');
		const users = db.collection('users');
		const histories = db.collection('histories');

		await histories.insertMany(
			(
				await users
					.find({}, { session })
					.map((doc) =>
						doc.history
							.map((h) => ({
								...h,
								updatedAt: h.createdAt,
								userId: doc._id
							}))
							.flat()
					)
					.toArray()
			).flat(),
			{ session }
		);

		await histories.updateMany(
			{ amount: { $type: 16 } },
			[{ $set: { amount: { $toLong: '$amount' } } }],
			{ multi: true, session }
		);

		await histories.updateMany(
			{ balance: { $type: 16 } },
			[{ $set: { balance: { $toLong: '$balance' } } }],
			{ multi: true, session }
		);

		await users.updateMany(
			{},
			{
				$unset: { role: '', stockPermission: '', sites: '', history: '' },
				$set: { isAdmin: false }
			},
			{ session }
		);
		await users.updateMany(
			{ balance: { $type: 16 } },
			[{ $set: { balance: { $toLong: '$balance' } } }],
			{ multi: true, session }
		);
		await users.updateMany(
			{ contact: { $type: 1 } },
			[{ $set: { contact: { $toLong: '$contact' } } }],
			{ multi: true, session }
		);
		await users.updateMany({ spent: { $type: 16 } }, [{ $set: { spent: { $toLong: '$spent' } } }], {
			multi: true,
			session
		});
		await users.updateMany(
			{ totalReceivedAmount: { $type: 16 } },
			[{ $set: { totalReceivedAmount: { $toLong: '$totalReceivedAmount' } } }],
			{ multi: true, session }
		);

		const sites = db.collection('sites');
		await sites.updateMany({ cost: { $type: 16 } }, [{ $set: { cost: { $toLong: '$cost' } } }], {
			multi: true,
			session
		});
		await sites.updateMany(
			{ managerSpentAmount: { $type: 16 } },
			[{ $set: { managerSpentAmount: { $toLong: '$managerSpentAmount' } } }],
			{ multi: true, session }
		);

		const siteEntries = db.collection('siteentries');
		await siteEntries.updateMany(
			{},
			{
				$rename: { site: 'siteId' }
			},
			{ session }
		);
		await sites.updateMany(
			{ managerSpentAmount: { $type: 16 } },
			[{ $set: { managerSpentAmount: { $toLong: '$managerSpentAmount' } } }],
			{ multi: true, session }
		);
		await sites.updateMany({ total: { $type: 16 } }, [{ $set: { total: { $toLong: '$total' } } }], {
			multi: true,
			session
		});

		const activities = db.collection('activities');
		const userIds = await users
			.find({}, { session })
			.map(({ _id, username }) => ({ _id, username }))
			.toArray();
		await Promise.all(
			userIds.map(({ _id: userId, username }) => {
				return activities.updateMany(
					{
						user: userId
					},
					{
						$set: { username },
						$unset: { user: '' }
					},
					{ session }
				);
			})
		);
	}, transactionOptions);
} finally {
	await session.endSession();
	await client.close();
}
