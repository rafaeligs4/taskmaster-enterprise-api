import { Request, Response } from "express";
import { RefreshTokenService } from "../../../application/services/RefreshTokenService";
import { AppError } from "../../Errors/AppError";


export class RefreshTokenController {

    constructor(private refreshToken: RefreshTokenService) { }


    run = async (req: Request, res: Response) => {

        const { refreshToken } = req.body;

        if (!refreshToken) {
            throw new AppError("No esta el error", 401)
        }
        const result = await this.refreshToken.execute(refreshToken);

        res.status(200).json(result);
    }
}