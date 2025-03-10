/*
    Ticket de Jira: KAN-79 
    Nombre: Andrés
    Fecha: 04/02/25
    Descripcion: Funciones para generar o validar un Token
*/

import jwt from 'jsonwebtoken';
const { sign, verify } = jwt;

// Definimos SECRET_KEY para la clave de encriptación
const SECRET_KEY = 'secretkey';

const tokenUtils = {
    // Función para generar un token JWT con los datos proporcionados
     signJwt:(tokenFrom) => {
        return new Promise((resolve, reject) => {
            jwt.sign(tokenFrom, 'secretkey', { expiresIn: '10000' }, (err, token) => {
                if (err) {
                    reject({ error: 'El usuario y/o contraseña no válido' });
                } else {
                    resolve({
                        message: '---- Usuario logueado correctamente ------',
                        token: 'Bearer ' + token
                    });
                }
            });
        });
    },
    // Función para verificar un token y devuelve su contenido decodificado
    decodeToken: (token) => {
        try {
            return verify(token, SECRET_KEY);
        } catch (error) {
            console.error('Error al verificar token:', error);
            return false;
        }
    },


    // Función para extraer el token del header y almacenarlo en req.token

    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(' ')[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    }
};

export default tokenUtils;
