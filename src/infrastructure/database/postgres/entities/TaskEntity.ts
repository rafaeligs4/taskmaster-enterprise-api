import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "tasks" }) // Nombre de la tabla en SQL
export class TaskEntity {

    @PrimaryColumn({ type: "uuid" })
    id: string;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ name: "statusTask", type: "varchar", length: 255 })
    statusTask: string;

    @Column({ name: "userId", type: "varchar", length: 255 })
    userId: string;

    // Relación ManyToOne: Muchas tareas pertenecen a un usuario
    @ManyToOne(() => UserEntity, (user) => user.tasks, { onDelete: "CASCADE" })
    @JoinColumn({ name: "userId" }) // Importante: Esto le dice a TypeORM que use la columna 'userId' de arriba para esta relación
    user: UserEntity;
}
