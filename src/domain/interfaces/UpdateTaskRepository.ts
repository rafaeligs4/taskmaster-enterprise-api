

export interface IUpdateTaskRepository {
    updateStatusTask(id: string, status: string): Promise<number>;
}