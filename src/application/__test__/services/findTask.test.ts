import { FindTask } from "../../services/FindTask";
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

  it("returns a Task when the repository finds it", async () => {
    const task = new Task("1", "Title", "Desc");
    mockTaskRepository.findById.mockResolvedValue(task);

    const findTaskService = new FindTask(mockTaskRepository);
    const result = await findTaskService.execute("1");

    expect(result).not.toBeNull();
    expect(result).toMatchObject({ id: "1", title: "Title", description: "Desc" });
    expect(mockTaskRepository.findById).toHaveBeenCalledWith("1");
  });

  it("returns null when the repository doesn't find the task", async () => {
    mockTaskRepository.findById.mockResolvedValue(null);

    const findTaskService = new FindTask(mockTaskRepository);
    const result = await findTaskService.execute("non-existent-id");

    expect(result).toBeNull();
    expect(mockTaskRepository.findById).toHaveBeenCalledWith("non-existent-id");
  });

});