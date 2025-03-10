import mongo from '../databases/mongo.connection.js';
import dotenv from 'dotenv';
import genericMongoCrud from '../models/crudsMongo/generic.crud.js';
dotenv.config();

export default {

	allTypesAddress: async (req, res) => {

		try {
			const result = await genericMongoCrud.getAll(process.env.COLL_LOCATIONS)
			res.json(result)
		} catch (error) {
			res.status(500).send('Internal Server Error');
		}
		finally {
			await mongo.closeClient()
		}
	}
}
