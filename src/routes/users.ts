import { Request, Response } from "express";
import { createUser, deleteAllUsers, getUserEmail } from '../db/queries/users.js';
import { config } from '../config.js';
import { Forbidden } from '../api/errors.js';
import { hashPassword, checkPasswordHash } from '../auth/auth.js';

export async function handlerCreateUser(req: Request, res: Response){
    const params = req.body;
    const hashedPw = await hashPassword(params.password);


    const newUser = await createUser({
        email: params.email,
        hashedPassword: hashedPw,
    });
    const { hashedPassword, ...user } = newUser;
    res.status(201).json(user);
}

export async function handlerDeleteAllUsers(req: Request, res: Response){
    if (config.api.platform !== "dev"){
        throw new Forbidden("Forbidden", 403);
    }
    const deleteUsers = await deleteAllUsers();
    res.status(200).json({ Deleted: "users deleted"})
}


export async function handlerLoginUser(req: Request, res: Response){
    const params = req.body;
    const { email, password } = params;
    console.log("params", params);
    const userEmail = await getUserEmail(email);
    const { hashedPassword } = userEmail;
    console.log("hased p", hashedPassword);
    const verifyPw = await checkPasswordHash(password, hashedPassword);
    console.log("vp", verifyPw)
    console.log("userEmail", userEmail);

}
