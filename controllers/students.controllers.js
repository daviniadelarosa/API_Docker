import crudMysql from '../models/crudsMysql/students.crud.js';
import genericCrud from '../models/crudsMysql/generic.crud.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const { sign, verify } = jwt;

/* ------------- FUNCTIONS ----------------*/

export default {

	// Función para manejar el inicio de sesión
	login: async (req, res) => {
		try {
			const { login, pass } = req.body // Recoge los datos del body.
			
			const userExists1 = await genericCrud.defineRol(process.env.TAB_ALUMNS, login, pass);
			const userExists2 = await genericCrud.defineRol(process.env.TAB_TEACHERS, login, pass);
			const userExists3 = await genericCrud.defineRol(process.env.TAB_EMPLOYES, login, pass);
			if (userExists1) {
				res.status(200).json(userExists1);
			} else {
				if (userExists2) {
					res.status(200).json(userExists2);
				} else {
					if (userExists3) {
						res.status(200).json(userExists3);
					} else {
						return res.status(404).json({ error: 'El usuario no existe' });
					}
				}
			}
			if (!login || !pass) {
				return res.status(400).json({ message: 'Faltan datos obligatorios' })
			}
		} catch (error) {
			console.error('Error al hacer login:', error);
			res.status(500).json({ message: 'Error al hacer login', error });
		}
	},

	//KAN-35
	// Función para obtener todos los usuarios.
	allUsers: async (req, res) => {
		try {
			const value = [process.env.TAB_ALUMNS];
			const data = await crudMysql.getAlumns(value);
			const response = data.map(user => ({
				id: user.id_student,
				isRegistered: user.isRegistered,
				name: user.student_name,
				lastnames: user.lastnames,
				address: user.address,
				phone: user.phone,
				email: user.email,
				dni: user.dni,
				pass: user.pass,
				isVisible: user.isVisible
			}));

			res.status(201).json(response)
		} catch (error) {
			console.error('Error : ', error)
			res.status(500).json({ message: 'Error al obtener usuarios', error })
		}
	},


	//KAN-28
	// Función para actualizar la contraseña.
	updatePass: async (req, res) => {
		try {
			const { email } = req.body;// Recoge los datos del body.
			if (!email) {
				return res.status(400).json({ message: "El campo email es obligatorio" });
			}
			const values = [process.env.TAB_ALUMNS, "email", email];
			// Llamar a la función getAlumns para verificar si el usuario existe.
			const user = await crudMysql.getAlumn(values);
			if (user.length === 0) {
				return res.status(400).json({ message: "Usuario no encontrado" });
			}
			// Si existe, genera el token.
			sign({ email }, process.env.SECRET_KEY, { expiresIn: "15m" }, (err, token) => {
				if (err) {
					return res.status(500).json({ message: "Error al generar el token", error: err });
				}

				res.status(200).json({
					message: "Usuario encontrado. Aquí está el token para cambiar la contraseña.",
					token: `Bearer ${token}`,
				});
			});
		} catch (error) {
			console.log("Error al actualizar contraseña: ", error);
			res.status(500).json({ message: "Error en el servidor.", error });
		}
	},

	/*
		Ticket de Jira: KAN-29 
		Nombre: Rafa 
		Fecha: 22/01/25
		Descripcion: Funcionalidad confirmar nuevo correo funcional
	*/
	// Función para confirmar la nueva contraseña.
	confirmPass: async (req, res) => {

		try {
			verify(req.params.token, process.env.SECRET_KEY, (err, token) => {
				if (err) {
					console.log("Error al validar el token: ", err);
					return res.status(500).json({ message: "Error al validar el token", error: err });
				}

				const { email } = token; //Extraemos el email del payload del token.
				const values = [process.env.TAB_ALUMNS, 'pass', req.body.pass, 'email', email];
				crudMysql.updateAlumnValue(values);

				return res.status(200).json({ message: 'Contraseña actualizada correctamente.' })
			})
		} catch (error) {
			console.log("Error al confirmar contraseña: ", error);
			res.status(500).json({ message: "Error en el servidor", error });
		}

	},

	//KAN-38
	// Función para obtener los datos del usuario que ha hecho Login.
	dataUserLogin: async (req, res) => {

		try {
			const { email, rol } = req.body;
			//Nombre y Apellidos del usuario que ha hecho login
			const rolName = `name`;
			const rolLastnames = `lastnames`;

			// Crear un arreglo con los valores del cuerpo de la solicitud (query).
			let values = [`${rol}`, 'isVisible', 1, 'email', email, 'dni', email];
			const user = await crudMysql.getAlumnByDniOrEmail(values);

			if (!user) {
				return res.status(401).json({ message: "Usuario no válido" });
			}

			let n = `${user[0][rolName]}`;
			let l = `${user[0][rolLastnames]}`

			const resp = {
				full_name: n + " " + l,
				address: user[0].students_address,
				phone: user[0].phone,
				email: user[0].email,
				dni: user[0].dni
			}

			return res.status(200).json(resp)
		} catch (error) {
			res.status(500).json({ message: "Error en el servidor", error });
		}
	},

	/*
		Ticket de Jira: KAN-30 
		Nombre: Natalia
		Fecha: 24/01/25
		Descripcion: Funcion para confirmar primer registro de usuario.
	*/
	confirmUser: async (req, res) => {
		try {
			const { info } = req.body;

			if (!info) {
				return res.status(400).json({ message: "El campo email/DNI es obligatorio" });
			}

			let values = [];
			let updateValues = [];

			if (info.includes(".com")) {
				values = ['email', "isRegistered", process.env.TAB_ALUMNS, 'email', info];
				updateValues = [process.env.TAB_ALUMNS, "isRegistered", true, 'email', info];
			} else {
				values = ['dni', "isRegistered", process.env.TAB_ALUMNS, 'dni', info];
				updateValues = [process.env.TAB_ALUMNS, "isRegistered", true, 'dni', info];
			}

			const [result] = await crudMysql.setRegisteredUser(values);

			if (result.length > 0 && result[0].isRegistered === 0) {
				crudMysql.updateAlumnValue(updateValues);
				return res.status(200).json({ message: `${result[0].email} registrado con éxito!` });
			}
			return res.status(401).json({ message: `El email no está en la base de datos o ya se encuentra registrado` });
		} catch (error) {
			return res.status(500).json({ message: 'Error en el registro', error })
		}
	}
}