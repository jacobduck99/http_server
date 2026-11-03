import { Request, Response } from "express";
import { createUser, deleteAllUsers } from '../db/queries/users.js';

export async function handlerCreateUser(req: Request, res: Response){
    const params = req.body;
    const newUser = await createUser(params)

    // if (typeof params?.body !== "string") {}
    console.log("params", params)
    console.log("new user", newUser);

    res.status(200).json({ newUser })
}

export async function handlerDeleteAllUsers(){
    const deleteUsers = await deleteAllUsers();
}
