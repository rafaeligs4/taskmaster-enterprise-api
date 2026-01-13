import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { AppDataSource } from "../database/postgres/data-source";
import { RefreshTokenEntity } from "../database/postgres/entities/refreshTokenEntity";
import { UserEntity } from "../database/postgres/entities/UserEntity";


export class UserRepositoryPostgres implements IUserRepository {

    // Obtenemos el repositorio interno de TypeORM
    private repository = AppDataSource.getRepository(UserEntity);
    private refreshTokenRepo = AppDataSource.getRepository(RefreshTokenEntity);
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
    async saveRefreshToken(userId: string, refreshToken: string): Promise<void> {
        // 1. Convertir Dominio -> Entidad de Base de Datos
        const refreshTokenEntity = this.refreshTokenRepo.create({
            token: refreshToken,
            userId: userId,
            revoked: false
        });

        // 2. Guardar en Postgres
        await this.refreshTokenRepo.save(refreshTokenEntity);
    }

    async findRefreshToken(token: string): Promise<RefreshTokenEntity | null> {
        const refreshTokenEntity = await this.refreshTokenRepo.findOne({ where: { token } });
        if (!refreshTokenEntity) return null;
        return refreshTokenEntity;
    }
}
