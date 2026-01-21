import { Task } from "../../domain/entities/Task";
import { ITaskRepository } from "../../domain/interfaces/ITaskRepository";
import { TaskEntity } from "../database/postgres/entities/TaskEntity";
import { AppDataSource } from "../database/postgres/data-source";
import { IUpdateTaskRepository } from "../../domain/interfaces/UpdateTaskRepository";

export class TaskRepositoryPostgres implements ITaskRepository, IUpdateTaskRepository {

    private repository = AppDataSource.getRepository(TaskEntity);

    async save(task: Task): Promise<void> {
        // Mapeo: Dominio -> SQL Entity
        const taskEntity = this.repository.create({
            id: task.id,
            title: task.title,
            description: task.description,
            statusTask: task.statusTask,
            userId: task.userId // Guardamos el string del ID
        });
        console.log(taskEntity);

        await this.repository.save(taskEntity);
    }

    async findAll(userId: string, limit?: number, offset?: number, completed?: boolean): Promise<Task[]> {
        // Query: SELECT * FROM tasks WHERE userId = '...'
        const taskEntities = await this.repository.find({
            where: { userId: userId },
            take: limit || 10,
            skip: offset || 0
        });

        // Mapeo: SQL Entities -> Dominio Task[]
        return taskEntities.map(entity => new Task(
            entity.id,
            entity.title,
            entity.description,
            entity.statusTask,
            entity.userId
        ));
    }
    async findById(id: string): Promise<Task | null> {
        const taskEntity = await this.repository.findOne({ where: { id } });
        if (!taskEntity) return null;
        return new Task(
            taskEntity.id,
            taskEntity.title,
            taskEntity.description,
            taskEntity.statusTask,
            taskEntity.userId
        );
    }
    async updateStatusTask(id: string, status: number): Promise<number> {
        const taskEntity = await this.repository.create({
            id: id,
            statusTask: status
        });
        await this.repository.save(taskEntity);
        return 1;
    }
    // Si tuvieras f delete, irían aquí...
}