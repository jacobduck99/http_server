import { Request, Response } from "express";
import { revokeRefreshToken } from '../db/queries/refreshTokens.js';
 
export async function handlerRevokeRefreshToken(req: Request, res: Response){
    const header = req.get('Authorization') as any;
    const token = header.split(" ")[1];
    const revokeToken = await revokeRefreshToken(token);
    res.status(200);
}
