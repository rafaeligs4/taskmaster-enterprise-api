import { NextFunction, Request, Response } from "express";
import { IJWTValidator } from "../../../domain/interfaces/IJWTProvider";

export class AuthMiddleware {
    constructor(
        private readonly jwtValidator: IJWTValidator
    ) { }

    handle = (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }
        const user = this.jwtValidator.verifyToken(token);
        console.log(user, "USER");

        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        next();
    }
}



