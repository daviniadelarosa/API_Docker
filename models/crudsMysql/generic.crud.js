/*
    Ticket de Jira: KAN-80
    Nombre: Rafa 
    Fecha: 04/02/25
    Descripcion: Refactorizando searchIntables
*/
import crudMysql from './students.crud.js';
import jwt from '../../utils/tokenUtils.js';
import sql from '../../databases/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {
    defineRol: async (tableName, login, pass) => {
        // Crear un array con los valores del cuerpo de la solicitud
        // Referencia -> 'SELECT ??, ??, ?? FROM ?? WHERE ?? = ? AND ?? = ? AND (?? = ? OR ?? = ?)'
        let values = ['email', 'dni', 'pass', 'name', `${tableName}`, 'isVisible', parseInt('1'), 'pass', pass, 'email', login, 'dni', login];
        let user = await crudMysql.loginAlumn(values);
        //Comprobamos si no se ha encontrado algún usuario que coincida
        if (user[0].length != 0) {
            //Configuramos el objeto con el que construiremos el token - KAN-42 // KAN-80: Ahora podemos usar singularTableName
            const tokenFrom = { ...user[0][0], rol: tableName };          
            return await jwt.signJwt(tokenFrom);
        }
        return false;
    },
    getOne: async (values) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        const [result] = await connection.query(query, [...values]);

        return result;
    }
};