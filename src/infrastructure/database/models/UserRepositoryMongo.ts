import { User } from "../../../domain/entities/User";
import { UserModel } from "../../../domain/entities/UserMongo";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class UserRepositoryMongo implements IUserRepository {
    constructor() { }

    async save(user: User): Promise<void> {
        try {
            const newUser = new UserModel({
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password
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