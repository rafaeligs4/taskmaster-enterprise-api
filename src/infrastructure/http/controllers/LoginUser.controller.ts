import { LoginUser } from "../../../application/services/Users/LoginUser";
import { Request, Response } from "express";

export class LoginUserController {
    constructor(private readonly loginUser: LoginUser) { }

    login = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        const user = await this.loginUser.execute(email, password);
        return response.status(200).json(user);
    }
}