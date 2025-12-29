export interface IJWTProvider {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}

export interface IJWTSigner {
    generateToken(payload: any): string;
}

export interface IJWTValidator {
    verifyToken(token: string): any;
}