import { Request, Response } from "express";
import { RegisterUser } from "../../../application/services/Users/RegisterUser";

export class RegisterUserController {

    constructor(private readonly registerUserService: RegisterUser) { }

    registerUser = async (request: Request, response: Response) => {

        const { name, email, password } = request.body;
        const user = await this.registerUserService.execute(email, password, name);
        return response.status(201).json({ email: user.email, name: user.name, password: user.password });

    }
}