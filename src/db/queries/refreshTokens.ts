import { db } from "../index.js";
import { eq } from 'drizzle-orm';
import { refresh_tokens, users } from "../schema.js";

export async function createUserRefreshToken(token: string, userId: string, expiresAt: Date){
    const [result] = await db
    .insert(refresh_tokens)
    .values({ token, user_id: userId, expires_at: expiresAt })
    .returning();
    return result;
}

export async function checkUserRefreshToken(token: string){
    const [result] = await db
    .select()
    .from(refresh_tokens)
    .innerJoin(users, eq(users.id, refresh_tokens.user_id))
    .where(eq(refresh_tokens.token, token));
    return result;
};

export async function revokeRefreshToken(token: string){
    const [result] = await db
    .update(refresh_tokens)
    .set({ revoked_at: new Date() })
    .where(eq(refresh_tokens.token, token))
    return result; 
}


