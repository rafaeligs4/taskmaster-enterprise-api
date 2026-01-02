import { Request, Response, NextFunction } from 'express';
import { AppError } from '../../Errors/AppError';
import { ZodError } from 'zod';
export const ErrorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error("🔥 Error detectado:", err.message);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ error: err.message });
    }

    // Errores de Zod (si no usaste el otro middleware)
    // ... lógica adicional si quieres
    if (err instanceof ZodError) {
        return res.status(400).json({ error: err.message });
    }
    // Error por defecto (500)
    return res.status(500).json({
        error: 'Internal Server Error',
        details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
};