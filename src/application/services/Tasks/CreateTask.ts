import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";
import { v4 as uuidv4 } from "uuid";

export class CreateTask {
    constructor(private taskRepository: ITaskRepository) {
    }

    async execute(title: string, description: string, idUser: string): Promise<Task> {
        // Validación simple: el título es obligatorio
        if (!title || title.trim() === '') {
            throw new Error('Title is required');
        }

        const task = new Task(uuidv4(), title, description, '0', idUser);

        await this.taskRepository.save(task);

        return task;
    }
}