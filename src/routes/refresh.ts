import { Request, Response } from "express";
import { checkUserRefreshToken } from '../db/queries/refreshTokens.js';

export async function handlerCheckToken(req: Request, res: Response){
    const header = req.get('Authorization') as any;
    console.log("header", header);
    const token = header.split(" ")[1];
    console.log("token", token);
    const checkTokenExists = await checkUserRefreshToken(token);
    console.log("check token", checkTokenExists);
}
