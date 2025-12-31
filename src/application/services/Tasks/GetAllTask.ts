import { Task } from "../../../domain/entities/Task";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";

export class GetAllTask {

    constructor(private readonly taskRepository: ITaskRepository) {

    }

    async execute(userId: string): Promise<Task[]> {
        try {
            const task: Task[] = await this.taskRepository.findAll(userId);
            return task;
        } catch (error) {

            return [];
        }

    }
}