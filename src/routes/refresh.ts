import { Request, Response } from "express";
import { checkUserRefreshToken } from '../db/queries/refreshTokens.js';
import { Unauthorized } from '../api/errors.js';
import { config } from '../config.js';
import { makeJWT, extractBearerToken } from '../auth/auth.js';

export async function handlerCheckToken(req: Request, res: Response){
    const header = req.get('Authorization');
    const token = extractBearerToken(header);
    const checkTokenExists = await checkUserRefreshToken(token);
    if (!checkTokenExists){
        throw new Unauthorized("token doesn't match", 401);
    }

    const { expires_at: expiresAt, revoked_at: revokedAt } = checkTokenExists.refresh_tokens;
    const tokenExpiryTime = expiresAt.getTime();
    const date = Date.now();
    if (tokenExpiryTime < date || revokedAt !== null ){
        throw new Unauthorized("token is expired", 401);
    }

    const oneHour = 60 * 60;
    const secret = config.api.jwtToken;
    const jwtToken = makeJWT(checkTokenExists.users.id, oneHour, secret);
    res.status(200).json({ token: jwtToken });
}
