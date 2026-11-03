import { Request, Response } from "express";
import { createUser, deleteAllUsers } from '../db/queries/users.js';
import { config } from '../config.js';
import { Forbidden } from '../api/errors.js';

export async function handlerCreateUser(req: Request, res: Response){
    const params = req.body;
    const newUser = await createUser(params)

    res.status(201).json(newUser)
}

export async function handlerDeleteAllUsers(req: Request, res: Response){
    if (config.api.platform !== "dev"){
        throw new Forbidden("Forbidden", 403);
    }
    const deleteUsers = await deleteAllUsers();
    res.status(200).json({ Deleted: "users deleted"})
}
