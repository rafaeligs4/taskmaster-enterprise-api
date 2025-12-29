import { hash, compare } from 'bcrypt';
import { IPasswordHasher } from '../../domain/interfaces/IHashPassword';

export class BcryptPasswordHasher implements IPasswordHasher {

    async hash(password: string): Promise<string> {
        // 10 es el "Salt Rounds" estándar
        return await hash(password, 10);
    }

    async compare(plain: string, hashed: string): Promise<boolean> {
        return await compare(plain, hashed);
    }
}