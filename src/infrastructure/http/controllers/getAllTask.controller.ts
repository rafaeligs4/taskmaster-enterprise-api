import { Request, Response } from "express";
import { TaskRepositoryInMemory } from "../../database/InmemoryTaskRepository";
import { Task } from "../../../domain/entities/Task";
import { GetAllTask } from "../../../application/services/GetAllTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";

export class GetAllTaskController {
    constructor( private readonly taskRepository: ITaskRepository){}


    public async getAllTask(request: Request, response: Response){
        const getAllTaskClass = new GetAllTask(this.taskRepository);
        const allTask: Task[] = await getAllTaskClass.execute();
        if(allTask.length < 1)  response.status(400);
        response.send(allTask).status(201);
    }
}