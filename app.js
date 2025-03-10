import express,{ json, urlencoded } from 'express';
import cors from 'cors';
import { router } from './routes/routes.js';
import dotenv from 'dotenv';
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./utils/Swagger/swaggerOptions.js"; 
dotenv.config();

const app = express()
// Configuración de Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(json())
app.use(urlencoded({ extended: false }))

app.use(cors())

app.use(router)

const port = process.env.PORT

app.listen(port, () => console.log(`Server running`))
