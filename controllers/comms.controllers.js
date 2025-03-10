
import mongo from '../databases/mongo.connection.js'
import dotenv from 'dotenv'
import genericMongoCrud from '../models/crudsMongo/generic.crud.js'
dotenv.config()

export default {

	allComms: async (req, res) => {

		try {
			const result = await genericMongoCrud.getAll(process.env.COLL_REPORT)

			res.json(result)
		} finally {
			await mongo.closeClient()

		}
	},

	newComm: async (req, res) => {
		try {
			// const db = client.db(process.env.MONGO_BBDD)
			// const collection = db.collection(process.env.COLL_REPORT)
			// const result = await collection.insertOne({ email, text, complaints })
			
			const result = await genericMongoCrud.newOne(process.env.COLL_REPORT, req.body)
			res.json(`Documento insertado con ID: ${result.insertedId}`)

		} finally {
			await mongo.closeClient()

		}
	},

	lopd: async (req, res) => {
		try {
			const result = await genericMongoCrud.getAll(process.env.COLL_PROTECTION)

			res.json(result)
		} finally {
			await mongo.closeClient()
		}
	}
}
