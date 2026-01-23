import { User } from "../../../domain/entities/User";
import { IPasswordHasher } from "../../../domain/interfaces/IHashPassword";
import { INotificationService } from "../../../domain/interfaces/INotificationService";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class RegisterUser {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly notificationService?: INotificationService
    ) { }

    async execute(email: string, password: string, name: string) {
        const userExists = await this.userRepository.findByEmail(email);
        if (userExists) {
            throw new Error("User already exists");
        }
        const newId = new Date().getTime().toString();
        const hashedPassword = await this.passwordHasher.hash(password);
        const newUser = new User(newId, name, email, hashedPassword);
        await this.userRepository.save(newUser);
        if (this.notificationService) {
            await this.notificationService.publishMessage(email, 'User registered', 'User registered successfully');
        }
        return newUser;
    }
}