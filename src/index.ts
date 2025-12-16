import "dotenv/config";
import * as routerCreate from "./infrastructure/http/routers/createTask.router";
import * as routerGetAll from "./infrastructure/http/routers/getAllTasks.router";
import * as routerFindId from "./infrastructure/http/routers/findTask.router";
import * as routerUpdate from "./infrastructure/http/routers/updateTask.router";
import express, { Express, Request, Response } from 'express';

// Inicializa la aplicación Express
const app: Express = express();

// Agregar parsers para leer body JSON y form-urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montar routers (debe ir después de los parsers)
app.use('/', routerCreate.router);
app.use('/getAll', routerGetAll.router);
app.use('/', routerFindId.router);
app.use('/', routerUpdate.router);
// Define el puerto en el que el servidor escuchará
// Se recomienda usar una variable de entorno para el puerto
const port: number | string = process.env.PORT || 3000;

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});
