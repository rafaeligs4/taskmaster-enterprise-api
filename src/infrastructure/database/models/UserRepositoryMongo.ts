import { User } from "../../../domain/entities/User";
import { compare, hash } from 'bcrypt';
import { UserModel } from "../../../domain/entities/UserMongo";
import { IPasswordHasher } from "../../../domain/interfaces/IHashPassword";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class UserRepositoryMongo implements IUserRepository, IPasswordHasher {
    constructor() { }

    hash(plain: string): Promise<string> {
        return new Promise((resolve, reject) => {
            hash(plain, 10, (err: Error | undefined, hash: string) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(hash);
                }
            });
        });
    }
    compare(plain: string, hashed: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            compare(plain, hashed, (err: Error | undefined, result: boolean) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }
    async save(user: User): Promise<void> {
        try {
            const hashedPassword = await this.hash(user.password);
            const newUser = new UserModel({
                id: user.id,
                name: user.name,
                email: user.email,
                password: hashedPassword
            });
            await newUser.save();

            console.log("Usuario guardado en MongoDB:", user);
        } catch (error) {
            console.error("Error al guardar en MongoDB:", error);
            throw new Error("Database Error");
        }
    }
    findByEmail(email: string): Promise<User | null> {
        const userFinded = UserModel.findOne({ email });
        return userFinded;
    }
    findById(id: string): Promise<User | null> {
        const userFinded = UserModel.findById(id);
        return userFinded;
    }
}