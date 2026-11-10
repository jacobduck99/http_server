import { hash, verify } from "argon2";
import { randomBytes } from 'node:crypto';
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { Unauthorized, BadRequest } from '../api/errors.js';

export async function hashPassword(password: string): Promise<string>{
    const hashPw = await hash(password);
    return hashPw;
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    const checkPw = await verify(hash, password);
    return checkPw;
}

export function makeRefreshToken(){
    const buff = randomBytes(32).toString('hex');
    return buff;
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

export function extractBearerToken(authorization: string | undefined): string {
    if (!authorization) {
        throw new Unauthorized("missing authorization header", 401);
    }
    const [scheme, token] = authorization.trim().split(" ");
    if (scheme !== "Bearer" || !token) {
        throw new Unauthorized("isn't Bearer or token empty", 401);
    }
    return token;
}

export function getBearerToken(req: Request): string{
    const header = req.get('Authorization');
    const extractToken = extractBearerToken(header);
    return extractToken;
};


