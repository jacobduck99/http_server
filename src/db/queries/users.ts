
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

