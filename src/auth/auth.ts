import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Unauthorized } from '../api/errors.js';

export async function hashPassword(password: string): Promise<string>{
    const hashPw = await hash(password);
    return hashPw;
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    const checkPw = await verify(hash, password);
    return checkPw;
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

export function makeJWT(userID: string, expiresIn: number, secret: string): string{
    const issueDateToken = Math.floor(Date.now() / 1000);
    const jwtPayload: payload = {
        "iss": "chirpy",
        "sub": userID,
        "iat": issueDateToken, 
        "exp": issueDateToken + expiresIn,
    } 

    const token = jwt.sign(jwtPayload, secret);
    return token;
};

export function validateJWT(tokenString: string, secret: string): string {
    let decoded: payload;
    try {
        decoded = jwt.verify(tokenString, secret) as JwtPayload;
    } catch (err) {
        throw new Unauthorized("invalid or expired token", 401);
    }
    if (!decoded.sub || typeof decoded.sub !== "string") {
        throw new Unauthorized("invalid token", 401);
    }
    return decoded.sub;
}
