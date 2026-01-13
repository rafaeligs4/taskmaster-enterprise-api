// export interface IJWTProvider {
//     generateToken(payload: any): string;
//     verifyToken(token: string): any;
// }

export interface IJWTSigner {
    generateRefreshToken(payload: string): string;
    generateAccessToken(payload: string): string;
}

export interface IJWTValidator {
    verifyToken(token: string): any;
}