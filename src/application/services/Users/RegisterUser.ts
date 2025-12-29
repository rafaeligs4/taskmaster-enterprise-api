import { User } from "../../../domain/entities/User";
import { IPasswordHasher } from "../../../domain/interfaces/IHashPassword";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class RegisterUser {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    async execute(email: string, password: string, name: string) {
        const newId = new Date().getTime().toString();
        const hashedPassword = await this.passwordHasher.hash(password);
        const newUser = new User(newId, name, email, hashedPassword);
        this.userRepository.save(newUser);
        return newUser;
    }
}