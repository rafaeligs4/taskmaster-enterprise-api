

export interface IUpdateTaskRepository {
    updateStatusTask(id: string, status: number): Promise<number>;
}