import sql from '../../databases/mysql.connection.js';

const connection = await sql.mySQLConnection();

export default {

    loginAlumn: async (values) => {
        const query = 'SELECT ??, ??, ??, ?? FROM ?? WHERE ?? = ? AND ?? = ? AND (?? = ? OR ?? = ?)'
        const result = await connection.query(query, [...values])
        return result;
    },

    createAlumn: async (values) => {
        const query = 'INSERT INTO ?? VALUES(NULL, ?, ?, ?, ?, ?, ?, ?, ?)'
        const [result] = await connection.query(query, [...values])
        return result.insertId;
    },

    getAlumnByDniOrEmail: async (values) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ? AND (?? = ? OR ?? = ?)';
        const [result] = await connection.query(query, [...values])
        return result;
    },

    getAlumns: async (values) => {
        const query = 'SELECT * FROM ??';
        const [result] = await connection.query(query, [...values])
        return result;
    },

    getAlumn: async (values) => {
        const query = 'SELECT * FROM ?? WHERE ?? = ?';
        const [result] = await connection.query(query, [...values])
        return result;
    },

    updateAlumn: async (values) => {
        const query = 'UPDATE ?? SET ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?'
        const [result] = await connection.query(query, [...values])
        return result.affectedRows
    },

    deleteAlumn: async (values) => {
        const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
        const [result] = await connection.query(query, [...values])
        return result.affectedRows
    },

    /*
        Ticket de Jira: KAN-29 
        Nombre: Rafa 
        Fecha: 22/01/25
        Descripcion: Funcionalidad confirmar nuevo correo funcional
    */

    updateAlumnValue: async (values) => {
        const query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?'
        const [result] = await connection.query(query, [...values])
        return result.affectedRows;
    },

    /*
        Ticket de Jira: KAN-30 
        Nombre: Natalia 
        Fecha: 24/01/25
        Descripcion: Poner al usuario como registrado tras el primer acceso.
    */
        confirmUser: async (values) => {
        const query = 'SELECT ??, ?? FROM ?? WHERE ?? = ? '
        const result = await connection.query(query, [...values])
        return result;
    },

    /*
    Ticket de Jira: KAN-94 
    Nombre: Andrés 
    Fecha: 05/02/25
    Descripcion: Obtener datos de los cursos
*/

    getCourses: async (values) => {
        const query = 'SELECT * FROM courses WHERE id IN (SELECT fk_id_course FROM students_courses WHERE fk_id_student = 1)'
        const [result] = await connection.query(query, [...values])
        return result;
    }
}