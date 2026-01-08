import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity()
export class UserEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 256 })
    password: string;
}