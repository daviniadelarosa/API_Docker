import mongo from '../databases/mongo.connection.js'
import genericMongoCrud from '../models/crudsMongo/generic.crud.js'
import dotenv from 'dotenv'
import genericMySqlCrud from '../models/crudsMysql/generic.crud.js'
dotenv.config()

export default {

    allCourses: async (req, res) => {

        try {
            const result = await genericMongoCrud.getAll(process.env.COLL_CERTIFICATIONS)
            res.json(result)

        } finally {
            await mongo.closeClient()
        }
    },


    /*
    Ticket de Jira: KAN-93 
    Nombre: Rafa
    Fecha: 05/02/25
    Descripcion: Obtener los datos de un curso
    */
    getOne: async (req, res) => {

        try {
            //Conformamos los datos de la solicitud
            const values = ['courses', 'id', req.body.id];
            const course = await genericMySqlCrud.getOne(values);

            if(course.length === 0){
                res.status(400).json({message: 'No existe un curso con la ID introducida'})
            } else {
                const customResponse = {
                    code: course[0].code,
                    name: course[0].name,
                    start_date: course[0].start_date,
                    end_date: course[0].end_date,
                    cover: course[0].cover
                }
    
                res.status(200).json(customResponse);
            }

        } catch (e) {
            res.status(400).json({ mesagge: 'Error inesperado al obtener los datos del curso', error: e })
        }
    }
}
