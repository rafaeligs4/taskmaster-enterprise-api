import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TaskEntity } from "./TaskEntity";
import { RefreshTokenEntity } from "./refreshTokenEntity";

@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn({ type: "varchar", length: 255 })
    id: string;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255, unique: true })
    email: string;

    @Column({ type: "timestamp", precision: 0, nullable: true })
    email_verified_at: Date;

    @Column({ type: "varchar", length: 255 })
    password: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    remember_token: string;

    // Un usuario tiene muchas tareas
    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[];

    // Relación con RefreshToken
    @OneToMany(() => RefreshTokenEntity, (token) => token.user)
    refreshTokens: RefreshTokenEntity[];
}