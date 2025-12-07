import { Request, Response } from "express";
import { UpdateStatusTask } from "../../../application/services/UpdateStatusTask";

export class UpdateTaskController {

    constructor(private readonly serviceUpdateTask: UpdateStatusTask) {

    }

    public updateTask = async (req: Request, res: Response) => {
        const { id } = req.params;
        if (!id) return res.status(500).json({ "message": "No hay ID" });

        const response = await this.serviceUpdateTask.execute(id, 1);
        res.status(201).json({ "message": "SUCCESS UPDATE" });
    }
}