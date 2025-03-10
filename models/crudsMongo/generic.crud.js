import mongo from '../../databases/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();

const client = await mongo.connectToMongo();

export default {
    getAll: async(coll) => {
        const db = client.db(process.env.MONGO_BBDD)
        const collection = db.collection(coll)
        const result = await collection.find({}).toArray()
        return result;
    },
    newOne: async(coll, values) => {
        const db = client.db(process.env.MONGO_BBDD)
        const collection = db.collection(coll)
        const result = await collection.insertOne(values)

        return result;
    } 
}