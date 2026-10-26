import { Request, Response } from "express";

type ChirpParams = {
  body: string;
};

type ResponseData = {
  error?: string;
  valid?: boolean;
};

export function handler(req: Request, res: Response) {
    const params: ChirpParams = req.body;

    if (typeof params?.body !== "string" || params.body.length > 140) {
    const respBody: ResponseData = { error: "Chirp is too long" };
    res.status(400).json(respBody);
    return;
    }

    const respBody: ResponseData = { valid: true };
    res.status(200).json(respBody);
}
