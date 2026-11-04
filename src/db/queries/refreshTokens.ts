import { db } from "../index.js";
import { refresh_tokens } from "../schema.js";

export async function createUserRefreshToken(token: string, userId: string, expiresAt: Date){
    const [result] = await db
    .insert(refresh_tokens)
    .values({ token, user_id: userId, expires_at: expiresAt })
    .returning();
    return result;
}
