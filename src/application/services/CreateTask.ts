import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";

export class CreateTask {
    constructor(private taskRepository: ITaskRepository) {
    }

    async excecute(title: string, description: string): Promise<Task>{
        // Validación simple: el título es obligatorio
        if (!title || title.trim() === '') {
            throw new Error('Title is required');
        }

        const task = new Task(Date.now().toString(), title, description);

        await this.taskRepository.save(task);

        return task;
    }
}