import { User } from "../entities/User";

export interface IUserRepository {
    save(user: User): Promise<void>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    findRefreshToken(token: string): Promise<object | null>;
    saveRefreshToken(userId: string, refreshToken: string): Promise<void>;
}