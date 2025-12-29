import { LoginUser } from "../../../application/services/Users/LoginUser";
import { Request, Response } from "express";

export class LoginUserController {
    constructor(private readonly loginUser: LoginUser) { }

    login = async (request: Request, response: Response) => {
        const { email, password } = request.body;
        if (!email || !password) {
            return response.status(400).json({ error: "Email y contraseña son obligatorios" });
        }
        try {
            const user = await this.loginUser.execute(email, password);
            return response.status(200).json(user);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Error al iniciar sesión" });
        }
    }
}