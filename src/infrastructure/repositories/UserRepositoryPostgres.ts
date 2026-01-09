import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { AppDataSource } from "../database/postgres/data-source";
import { UserEntity } from "../database/postgres/entities/UserEntity";


export class UserRepositoryPostgres implements IUserRepository {

    // Obtenemos el repositorio interno de TypeORM
    private repository = AppDataSource.getRepository(UserEntity);

    async save(user: User): Promise<void> {
        // 1. Convertir Dominio -> Entidad de Base de Datos
        const userEntity = this.repository.create({
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password // Ya viene hasheada
        });

        // 2. Guardar en Postgres
        await this.repository.save(userEntity);
    }

    async findByEmail(email: string): Promise<User | null> {
        // 1. Buscar en Postgres
        const userEntity = await this.repository.findOne({ where: { email } });

        if (!userEntity) return null;

        // 2. Convertir Entidad -> Dominio
        return new User(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password
        );
    }

    async findById(id: string): Promise<User | null> {
        const userEntity = await this.repository.findOne({ where: { id } });

        if (!userEntity) return null;

        return new User(
            userEntity.id,
            userEntity.name,
            userEntity.email,
            userEntity.password
        );
    }
}
