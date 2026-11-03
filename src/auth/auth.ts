import { hash, verify } from "argon2";

export async function hashPassword(password: string): Promise<string>{
    console.log("password", password); 
    const hashPw = await hash(password);
    console.log("hash", hashPw);
    return hashPw;
}


