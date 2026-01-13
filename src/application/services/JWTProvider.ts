
import jwt from 'jsonwebtoken';
import { IJWTSigner, IJWTValidator } from '../../domain/interfaces/IJWTProvider';

export class JwtTokenProvider implements IJWTSigner, IJWTValidator {
    private readonly SECRET_KEY = process.env.MONGO_URI || "secreto_super_secreto_taskmaster";

    generateRefreshToken(payload: string): string {
        // El token expira en 7 dias
        return jwt.sign({ id: payload }, this.SECRET_KEY, { expiresIn: '7d' });
    }
    generateAccessToken(payload: string): string {
        // El token expira en 15 minutos
        return jwt.sign({ id: payload }, this.SECRET_KEY, { expiresIn: '15min' });
    }
    verifyToken(token: string): string | null {
        try {
            const decoded = jwt.verify(token, this.SECRET_KEY) as { id: string };
            return decoded.id;
        } catch (error) {
            return null; // Token inválido o expirado
        }
    }
} 