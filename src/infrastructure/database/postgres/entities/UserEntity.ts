import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { TaskEntity } from "./TaskEntity";
import { RefreshTokenEntity } from "./refreshTokenEntity";


@Entity({ name: "users" })
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 256 })
    password: string;

    // Un usuario tiene muchas tareas
    @OneToMany(() => TaskEntity, (task) => task.user)
    tasks: TaskEntity[];
    // Relación con RefreshToken
    @OneToMany(() => RefreshTokenEntity, (token) => token.user)
    refreshTokens: RefreshTokenEntity[];
}