/*
Ticket de Jira: KAN-48
Nombre: Gema
Fecha: 24/01/25
Descripcion: Refactorizar las funciones de MongoDB en un fichero CRUD
*/

import mongo from '../databases/mongo.connection.js';
import dotenv from 'dotenv';
dotenv.config();

const client = await mongo.connectToMongo();

/* --------- CRUD -----------*/
export default {

    getAll: async (collectionName) => {
        let result={};
        try {
            const db = client.db(process.env.MONGO_BBDD);
            const collection = db.collection(collectionName);
            result = await collection.find({}).toArray();
        } finally {
            await mongo.closeClient()
        }

        return result;
    },

    postComms: async (collectionName, data) => {
        let result={};
		try {
			const db = client.db(mydb);
			const collection = db.collection(collectionName);
			result = await collection.insertOne(data);
            console.log(result)
		} finally {
            await mongo.closeClient()
        }
    
        return result;
	},

    lopdGet: async (collectionName) => {
        let result={};
		try {
			const db = client.db(mydb);
			const collection = db.collection(collectionName);
			result = await collection.find({}).toArray();
		} finally {
            await mongo.closeClient()
        }

        return result;
	}
}