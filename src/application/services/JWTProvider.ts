
import jwt from 'jsonwebtoken';
import { IJWTSigner, IJWTValidator } from '../../domain/interfaces/IJWTProvider';

export class JwtTokenProvider implements IJWTSigner, IJWTValidator {
    private readonly SECRET_KEY = process.env.MONGO_URI || "secreto_super_secreto_taskmaster";

    generateToken(payload: object): string {
        // El token expira en 1 hora
        return jwt.sign(payload, this.SECRET_KEY, { expiresIn: '1h' });
    }

    verifyToken(token: string): object | null {
        try {
            return jwt.verify(token, this.SECRET_KEY) as object;
        } catch (error) {
            return null; // Token inválido o expirado
        }
    }
} 