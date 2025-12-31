import { Request, Response } from "express";
import { CreateTask } from "../../../application/services/Tasks/CreateTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";
import { RequestUser } from "../../../domain/interfaces/RequestUser";

export class CreateTaskController {
  constructor(private serviceCreateTask: CreateTask) { }

  // Usar arrow function para preservar `this`
  public createTask = async (req: RequestUser, res: Response) => {
    // Debug: log headers y body para verificar content-type y payload
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', req.body);

    const body = req.body;
    if (!body || typeof body.title !== 'string' || body.title.trim() === '' || typeof body.description !== 'string' || body.description.trim() === '' || req.user.id.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    try {
      const task = await this.serviceCreateTask.execute(body.title, body.description, req.user.id);
      return res.status(201).json(task);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err?.message || 'Internal error' });
    }
  };
}