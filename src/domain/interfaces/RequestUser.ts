import { Request } from "express";

export interface RequestUser extends Request {
    user: {
        id: string;
        iat: number;
        exp: number;
    };
}