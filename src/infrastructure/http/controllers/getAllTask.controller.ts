import { Response } from "express";
import { TaskRepositoryInMemory } from "../../database/InmemoryTaskRepository";
import { Task } from "../../../domain/entities/Task";
import { GetAllTask } from "../../../application/services/Tasks/GetAllTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";
import { RequestUser } from "../../../domain/interfaces/RequestUser";

export class GetAllTaskController {
    constructor(private readonly serviceAllTask: GetAllTask) { }


    getAllTask = async (request: RequestUser, response: Response) => {
        if (!request.user.id) {
            return response.status(401).json({ message: 'Unauthorized' });
        }

        const allTask: Task[] = await this.serviceAllTask.execute(request.user.id);
        if (allTask.length < 1) response.status(400);
        response.send(allTask).status(201);
    }
}