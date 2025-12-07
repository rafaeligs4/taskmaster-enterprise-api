import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IUpdateTaskRepository } from "../../domain/interfaces/UpdateTaskRepository";

export class TaskRepositoryInMemory implements ITaskRepository, IUpdateTaskRepository {
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
    async updateStatusTask(id: string, status: number): Promise<number> {
        const task = this.tasks.find(t => t.id === id);
        if (!task) return 0;
        task.statusTask = status;
        return 1;
    }
}