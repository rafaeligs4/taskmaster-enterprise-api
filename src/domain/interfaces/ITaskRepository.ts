import { Task } from "../entities/Task";

export interface ITaskRepository {
    save(task: Task): Promise<void>;
    findAll(userId?: string): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
}