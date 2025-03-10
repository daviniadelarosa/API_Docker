import swaggerJsDoc from "swagger-jsdoc";
import YAML from 'yamljs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentsSwagger = YAML.load(path.resolve(__dirname, './students.yaml'));
const coursesSwagger = YAML.load(path.resolve(__dirname, './courses.yaml'));
const addressSwagger = YAML.load(path.resolve(__dirname, './address.yaml'));
const commsSwagger = YAML.load(path.resolve(__dirname, './comms.yaml'));
const genericSwagger = YAML.load(path.resolve(__dirname, './generic.yaml'));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Training Pro - API Documentación",
      version: "1.0.0",
      description: "Documentación de la API con Swagger",
      contact: {
        name: "Davinia",
        email: 'tfm.davinia.unir@gmail.com'
      },
    },
    tags: [
      { name: 'Address', description: 'Operaciones relacionadas con direcciones' },
      { name: 'Courses', description: 'Operaciones relacionadas con cursos' },
      { name: 'Students', description: 'Operaciones relacionadas con students' },
      { name: 'Comunications', description: 'Operaciones relacionadas con comunicados' },
      { name: 'Generic', description: 'Operaciones genéricas' },
      // ... otros tags
    ],
    servers: [
      {
        url: "TrainingPro_General",
      },
    ],
  },
  apis: ["./utils/Swagger/*.yaml"],
};

const swaggerDocs = swaggerJsDoc({
  ...swaggerOptions,
  definition: {
    ...swaggerOptions.definition,
    paths: {
      ...studentsSwagger.paths,
      ...coursesSwagger.paths,
      ...addressSwagger.paths,
      ...commsSwagger.paths,
      ...genericSwagger.paths
    },
  },
});

export default swaggerDocs;
