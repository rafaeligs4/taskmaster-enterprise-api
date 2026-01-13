import { IPasswordHasher } from "../../../domain/interfaces/IHashPassword";
import { IJWTSigner } from "../../../domain/interfaces/IJWTProvider";
import { IUserRepository } from "../../../domain/interfaces/IUserRepository";
import { AppError } from "../../../infrastructure/Errors/AppError";


export class LoginUser {
    constructor(
        private readonly userRepository: IUserRepository,
        private readonly passwordHasher: IPasswordHasher,
        private readonly jwtProvider: IJWTSigner
    ) { }

    async execute(email: string, password: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        const isPasswordValid = await this.passwordHasher.compare(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid password", 401);
        }
        const token = await this.jwtProvider.generateAccessToken(user.id);

        const refreshToken = await this.jwtProvider.generateRefreshToken(user.id);

        await this.userRepository.saveRefreshToken(user.id, refreshToken);
        return {
            name: user.name,
            email: user.email,
            token,
            refreshToken
        };
    }
}