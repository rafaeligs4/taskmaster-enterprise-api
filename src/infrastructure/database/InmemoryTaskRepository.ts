import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";

export class TaskRepositoryInMemory implements ITaskRepository {
    private tasks: Task[] = [];

    async save(task: Task): Promise<void> {
        this.tasks.push(task);
    }
    async findAll(): Promise<Task[]> {
        return this.tasks;
    }
    async findById(id: string): Promise<Task | null> {
        const task = this.tasks.find(t => t.id === id);
        return task || null;
    }
}