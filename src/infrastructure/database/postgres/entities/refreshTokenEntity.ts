import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "refresh_tokens" })
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "text" }) // El token JWT completo
    token: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ default: false })
    revoked: boolean; // 👈 Esto es la clave de la seguridad. Si es true, el token no sirve.

    @CreateDateColumn()
    createdAt: Date;

    // Relación con Usuario
    @ManyToOne(() => UserEntity, (user) => user.refreshTokens)
    @JoinColumn({ name: "user_id" })
    user: UserEntity;
}