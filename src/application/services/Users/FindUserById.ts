import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class FindUserById {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(id: string): Promise<User | null> {
        try {
            const response = await this.userRepository.findById(id);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}