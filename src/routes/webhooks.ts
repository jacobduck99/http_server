import { Request, Response } from "express";
import { updateUserToChirpyRed } from '../db/queries/users.js';
import { NotFound } from '../api/errors.js';
import { getAPIKey } from '../auth/auth.js';
import { config } from '../config.js';

export async function handlerWebHooks(req: Request, res: Response){
    const apiKey = getAPIKey(req);
    if (apiKey !== config.api.polka){
        res.status(401).end();
        return;
    }
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
