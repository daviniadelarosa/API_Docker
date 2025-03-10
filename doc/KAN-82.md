# CAMBIOS REALIZADOS:

Creación de un .gitignore para su uso más adelante en el despliegue

Creación del fichero .env

Cambio en el fichero package.json
- El script start ahora usa -r dotenv/config (requiere el .env)

Las ficheros que usan las variables de .env son los siguientes:
- mongo.connection.js
- mysql.connection.js

- address.controllers.js
- comms.controllers.js
- courses.controllers.js
- students.controllers.js

- crudMongoDB.js
- searchInTables.js (linea 37)

Se ha hecho un pequeño cambio en el templateQueries.json fuera de tarea Jira