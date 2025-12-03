import {  CreateTask } from '../../../application/services/CreateTask';
import { TaskRepositoryInMemory } from '../../database/InmemoryTaskRepository';
import { Request,Response } from 'express';

export class CreateTaskController {

    constructor(private taskRepo: TaskRepositoryInMemory) {
        
    }

    public createTask = (request: Request,response: Response)=>{
        const createTask = new CreateTask(this.taskRepo);
        const body = request.body;
        if(request.body.title === undefined || request.body.description === undefined){
            response.status(400).send({message: "Title and Description are required"});
            return;
        }
        createTask.excecute(body.title, body.description);
    }
}