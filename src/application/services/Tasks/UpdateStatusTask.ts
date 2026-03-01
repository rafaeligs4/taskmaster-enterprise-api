import { IUpdateTaskRepository } from "../../../domain/interfaces/UpdateTaskRepository";


export class UpdateStatusTask {
    constructor(private updateStatusTask: IUpdateTaskRepository) { }

    async execute(id: string, status: string): Promise<number> {
        try {
            const result = await this.updateStatusTask.updateStatusTask(id, status);
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}