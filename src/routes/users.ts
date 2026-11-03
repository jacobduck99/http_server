import { Request, Response } from "express";

export async function handlerCreateUser(req: Request, res: Response){
    const params = req.body;

    // if (typeof params?.body !== "string") {}
    console.log("params", params)

    res.status(200).json({ params })
}
