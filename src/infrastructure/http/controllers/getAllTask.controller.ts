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

        // Si no envían nada, usamos valores por defecto (Página 1, 10 items)
        const page = parseInt(request.query.page as string) || 1;
        const limit = parseInt(request.query.limit as string) || 10;

        // Opcional: Filtro por estado
        // (En la URL sería: ?completed=true)
        const completedFilter = request.query.completed;
        const allTask: Task[] = await this.serviceAllTask.execute(request.user.id, Number(limit), Number(page), Boolean(completedFilter));
        if (allTask.length < 1) response.status(400);
        response.send(allTask).status(201);
    }
}