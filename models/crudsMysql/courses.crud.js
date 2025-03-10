/*
    Ticket de Jira: KAN-93 
    Nombre: Rafa
    Fecha: 05/02/25
    Descripcion: Obtener los datos de un curso
    */

import sql from '../../databases/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {

    getCourse: async (values) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        const [result] = await connection.query(query, [...values]);

        return result;
    }
}