import { GetAllTask } from "../../services/GetAllTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";
import { Task } from "../../../domain/entities/Task";
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

describe("GetAllTask Use Case", () => {
    
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

  it("should return an array of tasks", async () => {
    // 1) Preparar datos de prueba
    const task1 = new Task("1", "Aprender SOLID", "Estudiar el principio de Inversión de Dependencias");
    const task2 = new Task("2", "Práctica TDD", "Escribir tests para servicios");
    // configuramos el mock para que devuelva el array esperado
    mockTaskRepository.findAll.mockResolvedValue([task1, task2]);

    // 2) Instanciar el servicio con el repo mock
    const getAllTaskService = new GetAllTask(mockTaskRepository);

    // 3) Ejecutar
    const tasks = await getAllTaskService.execute();

    // 4) Verificaciones
    // Es un array
    expect(Array.isArray(tasks)).toBe(true);
    // Tiene la longitud esperada
    expect(tasks).toHaveLength(2);
    // Los elementos son objetos con las propiedades esperadas
    expect(tasks[0]).toMatchObject({ id: "1", title: "Aprender SOLID", description: "Estudiar el principio de Inversión de Dependencias" });
    expect(tasks[1]).toMatchObject({ id: "2", title: "Práctica TDD", description: "Escribir tests para servicios" });

    // Verificar interacción con el repo
    expect(mockTaskRepository.findAll).toHaveBeenCalledTimes(1);
  });

});