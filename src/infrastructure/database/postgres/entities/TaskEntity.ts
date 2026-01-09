import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "tasks" }) // Nombre de la tabla en SQL
export class TaskEntity {

    @PrimaryColumn("varchar") // Usamos varchar porque guardamos IDs generados manualmente (strings)
    id: string;

    @Column("varchar")
    title: string;

    @Column("text") // 'text' permite strings más largos que 'varchar'
    description: string;

    @Column("int", { default: 0 })
    statusTask: number;

    @Column("varchar")
    userId: string; // Por ahora lo dejamos como string simple (luego haremos la relación real)

    // Relación ManyToOne: Muchas tareas pertenecen a un usuario
    @ManyToOne(() => UserEntity, (user) => user.tasks)
    @JoinColumn({ name: "userId" }) // Importante: Esto le dice a TypeORM que use la columna 'userId' de arriba para esta relación
    user: UserEntity;
}
