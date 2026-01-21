import { Task } from "../entities/Task";

export interface ITaskRepository {
    save(task: Task): Promise<void>;
    findAll(userId?: string, limit?: number, offset?: number, completed?: boolean): Promise<Task[]>;
    findById(id: string): Promise<Task | null>;
}