import { BcryptPasswordHasher } from "../application/services/HashPasswors";
import { CreateTask } from "../application/services/Tasks/CreateTask";
import { FindTask } from "../application/services/Tasks/FindTask";
import { GetAllTask } from "../application/services/Tasks/GetAllTask";
import { UpdateStatusTask } from "../application/services/Tasks/UpdateStatusTask";
import { RegisterUser } from "../application/services/Users/RegisterUser";
import { TaskRepositoryInMemory } from "./database/InmemoryTaskRepository";
import { UserRepositoryMongo } from "./database/models/UserRepositoryMongo";
import { MongoDBConnection } from "./database/mongoDB";
import { TaskRepositoryMongo } from "./database/TaskRepositoryMongo";
import { CreateTaskController } from './http/controllers/createTask.controller';
import { FindTaskController } from "./http/controllers/findTask.controller";
import { GetAllTaskController } from "./http/controllers/getAllTask.controller";
import { RegisterUserController } from "./http/controllers/registerUser.controller";
import { UpdateTaskController } from "./http/controllers/updateTask.controller";

/**
 * DEPENDENCIES
 * Aqui vamos a instanciar las dependencias que sean necesarias. Ya que no se generaran automaticamente como en un framework 
 */

// const taskRepository = new TaskRepositoryInMemory();
const connectionMongo = new MongoDBConnection();
connectionMongo.connect();
// Aqui podemos cambiar la implementacion del repositorio si es necesario
const taskRepository = new TaskRepositoryMongo();
const userRepository = new UserRepositoryMongo();
const passwordHasher = new BcryptPasswordHasher();
//
// const taskRepository = new TaskRepositoryInMemory();
/*
SERVICIOS 
*/

const createTaskRef = new CreateTask(taskRepository);
const getAllTask = new GetAllTask(taskRepository);
const findTaskById = new FindTask(taskRepository);
const updateTask = new UpdateStatusTask(taskRepository);
const registerUser = new RegisterUser(userRepository, passwordHasher);
/*
CONTROLADORES 
*/
export const createTController = new CreateTaskController(createTaskRef);
export const getAllCont = new GetAllTaskController(getAllTask);
export const findByIdController = new FindTaskController(findTaskById);
export const updateTaskCont = new UpdateTaskController(updateTask);
export const registerUserCont = new RegisterUserController(registerUser);