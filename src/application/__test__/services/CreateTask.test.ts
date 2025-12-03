import { CreateTask } from "../../services/CreateTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe("CreateTask Use Case", () => {
    
    // 1. PREPARAR EL MOCK (ARRANGE)
    // Creamos un objeto falso que finge ser un ITaskRepository.
    // jest.fn() es una función espía: no hace nada, pero recuerda si fue llamada.
    const mockTaskRepository: jest.Mocked<ITaskRepository> = {
        save: jest.fn(),                  // Promise<void>
        findAll: jest.fn(),           // Promise<Task[]>
        findById: jest.fn()    // Promise<Task | null>
    };

    // Reseteamos el espía antes de cada test para que el conteo empiece en 0
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should create a task and save it using the repository", async () => {
        // 2. INSTANCIAR EL SERVICIO (ARRANGE)
        // Le inyectamos nuestro repositorio falso.
        const createTaskService = new CreateTask(mockTaskRepository);
        
        const title = "Aprender SOLID";
        const description = "Estudiar el principio de Inversión de Dependencias";

        // 3. EJECUTAR (ACT)
        const task = await createTaskService.excecute(title, description);

        // 4. VERIFICAR (ASSERT)
        
        // Verificamos que la tarea devuelta sea correcta
        expect(task.title).toBe(title);
        expect(task.description).toBe(description);
        expect(task.id).toBeDefined();

        // LA MAGIA DEL MOCK:
        // Verificamos que el método .save() del repositorio FUE LLAMADO.
        expect(mockTaskRepository.save).toHaveBeenCalledTimes(1);
        
        // Verificamos que fue llamado CON la tarea correcta.
        expect(mockTaskRepository.save).toHaveBeenCalledWith(task);
    });

    it("should throw an error if title is empty", async () => {
        const createTaskService = new CreateTask(mockTaskRepository);

        // Verificamos que lance error si no enviamos título
        await expect(createTaskService.excecute("", "desc")).rejects.toThrow("Title is required");
    });
});