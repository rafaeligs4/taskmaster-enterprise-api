import { NextFunction, Request, Response } from "express";
import { IJWTValidator } from "../../../domain/interfaces/IJWTProvider";
import { RequestUser } from "../../../domain/interfaces/RequestUser";

export class AuthMiddleware {
    constructor(
        private readonly jwtValidator: IJWTValidator
    ) { }

    handle = (req: RequestUser, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const dataToken: { id: string; iat: number; exp: number } = this.jwtValidator.verifyToken(token);
        if (!dataToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        console.log(dataToken.id, "USER");
        req.user = dataToken;
        if (!dataToken) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next();
    }
}



