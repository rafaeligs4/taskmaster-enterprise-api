import { TaskRepositoryInMemory } from "./database/InmemoryTaskRepository";
import { CreateTaskController } from './http/controllers/createTask.controller';

/**
 * DEPENDENCIES
 * Aqui vamos a instanciar las dependencias que sean necesarias. Ya que no se generaran automaticamente como en un framework 
 */

const taskRepository = new TaskRepositoryInMemory();

export const createTController = new CreateTaskController(taskRepository);

