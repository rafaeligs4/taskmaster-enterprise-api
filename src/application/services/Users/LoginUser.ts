import { IPasswordHasher } from "../../../domain/interfaces/IHashPassword";
import { IJWTSigner } from "../../../domain/interfaces/IJWTProvider";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";


export class LoginUser {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly jwtProvider: IJWTSigner
    ) { }

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const isPasswordValid = await this.passwordHasher.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }
        const token = await this.jwtProvider.generateToken({ id: user.id });
        return {
            name: user.name,
            email: user.email,
            token
        };
    }
}