import { Request, Response } from "express";

export async function handlerWebHooks(req: Request, res: Response){
    const header = req.get('event');
    console.log('header', header);
}
