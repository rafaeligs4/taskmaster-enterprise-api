import { Request, Response } from "express";
import { CreateTask } from "../../../application/services/CreateTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";

export class CreateTaskController {
  constructor(private serviceCreateTask: CreateTask) { }

  // Usar arrow function para preservar `this`
  public createTask = async (req: Request, res: Response) => {
    // Debug: log headers y body para verificar content-type y payload
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Body:', req.body);

    const body = req.body;
    if (!body || typeof body.title !== 'string' || body.title.trim() === '') {
      return res.status(400).json({ message: 'Title is required' });
    }

    try {
      const task = await this.serviceCreateTask.execute(body.title, body.description);
      return res.status(201).json(task);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err?.message || 'Internal error' });
    }
  };
}