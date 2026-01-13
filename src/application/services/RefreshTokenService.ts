import { IJWTSigner, IJWTValidator } from "../../domain/interfaces/IJWTProvider";
import { IUserRepository } from "../../domain/interfaces/IUserRepository";
import { AppError } from "../../infrastructure/Errors/AppError";


export class RefreshTokenService {

    constructor(
        private userService: IUserRepository,
        private tokenValidator: IJWTValidator,
        private tokenGenerator: IJWTSigner
    ) { }

    async execute(refreshToken: string) {
        let payload
        try {
            payload = await this.tokenValidator.verifyToken(refreshToken);
        } catch (error) {
            throw new AppError("Error de token invalido", 401);
        }
        if (!payload) {
            throw new AppError("Error de token invalido", 401);
        }
        const tokenObject: any = await this.userService.findRefreshToken(refreshToken);
        if (!tokenObject) {
            throw new AppError("Error de token invalido", 401);
        }
        if (tokenObject.revoked) {
            throw new AppError("Token Vencido", 401);
        }
        const newAccesToken = await this.tokenGenerator.generateAccessToken(payload);

        return { accesToken: newAccesToken }
    }


}