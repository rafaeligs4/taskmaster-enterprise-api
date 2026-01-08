import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity({ name: "tasks" }) // Nombre de la tabla en SQL
export class TaskEntity {

    @PrimaryColumn("varchar") // Usamos varchar porque guardamos IDs generados manualmente (strings)
    id: string;

    @Column("varchar")
    title: string;

    @Column("text") // 'text' permite strings más largos que 'varchar'
    description: string;

    @Column("boolean", { default: false })
    completed: boolean;

    @Column("varchar")
    userId: string; // Por ahora lo dejamos como string simple (luego haremos la relación real)
}