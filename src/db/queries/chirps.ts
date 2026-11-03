import { db } from "../index.js";
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
