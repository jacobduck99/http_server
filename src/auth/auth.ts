import { hash, verify } from "argon2";

export async function hashPassword(password: string): Promise<string>{
    const hashPw = await hash(password);
    return hashPw;
}


