import { Request, Response } from "express";
import { revokeRefreshToken } from '../db/queries/refreshTokens.js';
import { extractBearerToken } from '../auth/auth.js';
 
export async function handlerRevokeRefreshToken(req: Request, res: Response){
    const header = req.get('Authorization');
    const token = extractBearerToken(header);
    const revokeToken = await revokeRefreshToken(token);
    res.status(204).end();
}
