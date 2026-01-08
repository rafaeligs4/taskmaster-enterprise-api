import { User } from "../../../domain/entities/User";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";

export class FindUserByEmail {
    constructor(private readonly userRepository: IUserRepository) { }

    async execute(id: string): Promise<User | null> {
        try {
            const response = await this.userRepository.findByEmail(id);
            return response;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}