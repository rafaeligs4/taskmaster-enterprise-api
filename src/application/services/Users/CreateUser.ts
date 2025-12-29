import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";

export class CreateUser {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(user: User): Promise<any | null> {
        try {
            await this.userRepository.save(user);
            return { title: "Guardado correcto" }
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}