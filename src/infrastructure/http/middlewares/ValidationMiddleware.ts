import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validate = (schema: ZodObject<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const validation = schema.safeParse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        if (!validation.success) {
            const formattedErrors = validation.error.issues.map((error) => ({
                field: error.path.join('.'),
                message: error.message
            }));

            return res.status(400).json({
                message: "Validation Error",
                errors: formattedErrors[0]?.message
            });
        }
        next();
    };
};