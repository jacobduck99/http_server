import { Request, Response } from "express";
import { revokeRefreshToken } from '../db/queries/refreshTokens.js';
 
export async function handlerRefresh(req: Request, res: Response){
    const header = req.get('Authorization');
    const token = header.split(" ")[1];
    const date = Date.now();
    const revokeToken = await revokeRefreshToken(token, date);
    res.status(200);
}
