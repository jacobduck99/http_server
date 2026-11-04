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

export async function getUserEmail(email: string) {
    const [result] = await db
    .select().from(users).where(eq(users.email, email))
    return result;
}



