import { Request, Response } from "express";
import { updateUserToChirpyRed } from '../db/queries/users.js';
import { NotFound } from '../api/errors.js';

export async function handlerWebHooks(req: Request, res: Response){
    const params = req.body;
    const { event, data } = params;
    const { userId } = data;
    console.log("event", event)
    console.log("data", data);
    console.log("user id", userId);
    if (event !== "user.upgraded"){
        res.status(204).end();
    } else if (event === "user.upgraded"){
        const upgradeUser = await updateUserToChirpyRed(userId); 
        if (upgradedUser === undefined){
            throw new NotFound("user not found", 404);
        }
        res.status(204).end();
    }
}
