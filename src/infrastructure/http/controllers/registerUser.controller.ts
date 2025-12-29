import { Request, Response } from "express";
import { RegisterUser } from "../../../application/services/Users/RegisterUser";

export class RegisterUserController {

    constructor(private readonly registerUserService: RegisterUser) { }

    registerUser = async (request: Request, response: Response) => {

        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                error: "Nombre, email y contraseña son obligatorios"
            });
        }
        try {
            const user = await this.registerUserService.execute(email, password, name);
            return response.status(201).json({ email: user.email, name: user.name, password: user.password });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ error: "Error al registrar el usuario" });
        }

    }
}