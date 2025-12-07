import { CreateTask } from "../application/services/CreateTask";
import { FindTask } from "../application/services/FindTask";
import { GetAllTask } from "../application/services/GetAllTask";
import { UpdateStatusTask } from "../application/services/UpdateStatusTask";
import { TaskRepositoryInMemory } from "./database/InmemoryTaskRepository";
import { CreateTaskController } from './http/controllers/createTask.controller';
import { FindTaskController } from "./http/controllers/findTask.controller";
import { GetAllTaskController } from "./http/controllers/getAllTask.controller";
import { UpdateTaskController } from "./http/controllers/updateTask.controller";

/**
 * DEPENDENCIES
 * Aqui vamos a instanciar las dependencias que sean necesarias. Ya que no se generaran automaticamente como en un framework 
 */

const taskRepository = new TaskRepositoryInMemory();
const createTaskRef = new CreateTask(taskRepository);
const getAllTask = new GetAllTask(taskRepository);
const findTaskById = new FindTask(taskRepository);
const updateTask = new UpdateStatusTask(taskRepository);
export const createTController = new CreateTaskController(createTaskRef);
export const getAllCont = new GetAllTaskController(getAllTask);
export const findByIdController = new FindTaskController(findTaskById);
export const updateTaskCont = new UpdateTaskController(updateTask);
