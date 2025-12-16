import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { IUpdateTaskRepository } from "../../domain/interfaces/UpdateTaskRepository";
import { TaskModel } from "./models/TaskModel";

export class TaskRepositoryMongo implements ITaskRepository, IUpdateTaskRepository {

    // Ya no necesitamos inyectar la conexión manualmente si usamos Mongoose Models directamente
    // Mongoose maneja la conexión internamente a través de sus modelos
    constructor() { }

    public async save(task: Task): Promise<void> {
        try {
            // Creamos una instancia del modelo Mongoose
            // Mapeamos tu entidad de dominio al documento de Mongo
            const newTask = new TaskModel({
                _id: task.id,
                title: task.title,
                description: task.description,
                statusTask: task.statusTask
            });

            await newTask.save();
            console.log("Tarea guardada en MongoDB:", task);
        } catch (error) {
            console.error("Error al guardar en MongoDB:", error);
            throw new Error("Database Error");
        }
    }

    public async findById(id: string): Promise<Task | null> {
        try {
            const taskDoc = await TaskModel.findById(id);
            if (!taskDoc) return null;

            // Mapeamos de vuelta del Documento de Mongo a tu Entidad de Dominio
            return new Task(
                taskDoc._id as string,
                taskDoc.title,
                taskDoc.description,
                taskDoc.statusTask
            );
        } catch (error) {
            console.error("Error al buscar por ID:", error);
            return null;
        }
    }

    public async findAll(): Promise<Task[]> {
        try {
            const taskDocs = await TaskModel.find();
            console.log(taskDocs, "Task Docs");
            return taskDocs.map(doc => new Task(
                doc._id as string,
                doc.title,
                doc.description,
                doc.statusTask
            ));
        } catch (error) {
            console.error("Error al buscar todas las tareas:", error);
            return [];
        }
    }

    async updateStatusTask(id: string, status: number): Promise<number> {
        try {
            const result = await TaskModel.updateOne({ _id: id }, { statusTask: status });
            return result.modifiedCount > 0 ? 1 : 0;
        } catch (error) {
            console.error("Error al actualizar estado:", error);
            return 0;
        }
    }
}
