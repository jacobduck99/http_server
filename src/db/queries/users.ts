import { eq } from 'drizzle-orm';
import { db } from "../index.js";
import { NewUser, users, chirps } from "../schema.js";

export async function createUser(user: NewUser) {
  const [result] = await db
    .insert(users)
    .values(user)
    .onConflictDoNothing()
    .returning();
  return result;
}

export async function deleteAllUsers() {
    const deleteUsers = await db.delete(users);
    return deleteUsers;
}

export async function getUser(email: string) {
    const [result] = await db
    .select().from(users).where(eq(users.email, email))
    return result;
}

export async function updateUser(email: string, password:string, userId: number){
    const result = await db
    .update(users)
    .set({ email: email, hashedPassword: password })
    .where(eq(users.id, userId))
    return result;
}



