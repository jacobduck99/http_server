import { Request, Response } from "express";
import { updateUserToChirpyRed } from '../db/queries/users.js';
import { NotFound } from '../api/errors.js';

export async function handlerWebHooks(req: Request, res: Response){
    const params = req.body;
    const { event, data } = params;
    const { userId } = data;

    if (event !== "user.upgraded"){
        res.status(204).end();
        return;
    } else{
        const upgradeUser = await updateUserToChirpyRed(userId); 
        if (upgradeUser === undefined){
            res.status(404).end();
            return;
        }
        res.status(204).end();
    }
}
