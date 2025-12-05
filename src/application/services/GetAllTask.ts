import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { TaskRepositoryInMemory } from "../../infrastructure/database/InmemoryTaskRepository";

export class GetAllTask {

    constructor(private readonly taskRepository: ITaskRepository){

    }

    async execute(): Promise<Task[]>{
        try {
        const task: Task[] = await this.taskRepository.findAll();
        return task;
        } catch (error) {

            return [];
        }

    }
}