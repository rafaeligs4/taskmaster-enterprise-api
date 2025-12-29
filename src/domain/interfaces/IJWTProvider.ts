export interface IJWTProvider {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}