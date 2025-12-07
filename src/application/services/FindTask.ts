import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";

export class FindTask {
  constructor(private readonly taskRepository: ITaskRepository){

  } 
  
  public async execute(id: string): Promise<Task | null>{
    const task = await this.taskRepository.findById(id);
    return task;
  }
}