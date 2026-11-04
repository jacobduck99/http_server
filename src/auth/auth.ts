import { hash, verify } from "argon2";

export async function hashPassword(password: string): Promise<string>{
    const hashPw = await hash(password);
    return hashPw;
}

export async function checkPasswordHash(password: string, hash: string): Promise<boolean>{
    const checkPw = await verify(password, hash);
    return checkPw;
}

