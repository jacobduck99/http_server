import { Request, Response } from "express";
import { checkUserRefreshToken } from '../db/queries/refreshTokens.js';
import { Unauthorized } from '../api/errors.js';

export async function handlerCheckToken(req: Request, res: Response){
    const header = req.get('Authorization') as any;
    const token = header.split(" ")[1];
    const checkTokenExists = await checkUserRefreshToken(token);
    if (!checkTokenExists){
        throw new Unauthorized("token doesn't match", 401);
    }

    const { token: refreshToken, expires_at: expiresAt, revoked_at: revokedAt } = checkTokenExists;
    const tokenExpiryTime = expiresAt.getTime();
    const date = Date.now();
    if (tokenExpiryTime < date || revokedAt !== null ){
        throw new Unauthorized("token is expired", 401);
    }
    res.status(200).json({token: token})
}
