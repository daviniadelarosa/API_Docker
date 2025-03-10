import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()

//const url = process.env.URI_MONGOLOCAL
const url = process.env.URI_MONGOLOCAL

export default {

	connectToMongo: async () => {
		const client = new MongoClient(url);
		await client.connect();

		return client;
	},

	closeClient: async () => {
		const client = new MongoClient(url);
		await client.close();

		return client;
	}
}