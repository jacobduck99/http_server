import { hash, verify } from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export async function hashPassword(password: string): Promise<string>{
    const hashPw = await hash(password);
    return hashPw;
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    const checkPw = await verify(hash, password);
    return checkPw;
}

type payload = Pick<JwtPayload, "iss" | "sub" | "iat" | "exp">;

function makeJWT(userID: string, expiresIn: number, secret: string): string{
    const issueDateToken = Math.floor(Date.now() / 1000);
    console.log("issuedate", issueDateToken);
    const jwtPayload: payload = {
        "iss": "chirpy",
        "sub": userID,
        "iat": issueDateToken, 
        "exp": issueDateToken + expiresIn,
    } 
    const token = jwt.sign(userID, secret, expiresIn);
    return jwtPayload.sub as any;
};
