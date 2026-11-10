import { db } from "../index.js";
import { asc, eq } from 'drizzle-orm';
import { chirps } from "../schema.js";

export async function createUserChirp(body: string, userId: string) {
    const [result] = await db
    .insert(chirps)
    .values({ body, userId })
    .returning();
    return result;
}

export async function getAllChirps(){
    const result = await db
    .select().from(chirps)
    .orderBy(asc(chirps.createdAt));
    return result;
}

export async function getChirpById(id: string){
    const [result] = await db
    .select().from(chirps)
    .where(eq(chirps.id, id))
    return result;
}

export async function deleteChirpById(userId: string, chirpId: string){
    await db 
    .delete(chirps)
    .where(and(
    eq(chirps.userId, userId),
    eq(chirps.id, chirpId),
    )
    )
}

