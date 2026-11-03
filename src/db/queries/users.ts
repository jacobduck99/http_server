
import { db } from "../index.js";
import { NewUser, users } from "../schema.js";

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

export async function createUserChirp(body: reqBody, userId: userid) {
    const [result] = await db
    .insert(chirps)
    .values({body: body, user_id: userId}).returning(); 
}
