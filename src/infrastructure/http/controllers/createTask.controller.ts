import { Request, Response } from "express";
import { CreateTask } from "../../../application/services/CreateTask";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";

export class CreateTaskController {
  constructor(private taskRepo: ITaskRepository) {}

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
      const service = new CreateTask(this.taskRepo);
      // Ajusta el nombre del método si tu servicio usa "execute" o "excecute"
      const task = await (service as any).excecute?.(body.title, body.description) ?? await (service as any).execute(body.title, body.description);
      return res.status(201).json(task);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err?.message || 'Internal error' });
    }
  };
}