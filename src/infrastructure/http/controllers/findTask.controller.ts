import { Request, Response } from "express";
import { ITaskRepository } from "../../../domain/interfaces/ITaskRepository";
import { FindTask } from "../../../application/services/FindTask";


export class FindTaskController {
  constructor(private findById: FindTask) { }

  public findTask = async (req: Request, res: Response) => {
    // Obtenemos el valor
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'No se ha encontrado el ID' });
    try {
      const task = await this.findById.execute(id);
      if (!task) throw "Error no se encontró"
      return res.status(201).json(task);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ message: err?.message || 'Internal error' });
    }
  };

}