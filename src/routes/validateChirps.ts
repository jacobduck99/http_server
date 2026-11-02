import { Request, Response } from "express";
import { BadRequest } from '../api/errors.js';

type ChirpParams = {
  body: string;
};

type ResponseData = {
  error?: string;
  valid?: boolean;
  cleanedBody?: string;
};

export async function handlerChirpsValidate(req: Request, res: Response) {
    const params = req.body;

    if (typeof params?.body !== "string" || params.body.length > 140) {
    throw new BadRequest('Chirp is too long. Max length is 140', 400);
    return;
    }

    const badWords = ["kerfuffle", "sharbert", "fornax"];

    const cleaned = params.body
    .split(" ")
    .map((word: string) =>
      badWords.includes(word.toLowerCase()) ? "****" : word
    )
    .join(" ");

    res.status(200).json({ cleanedBody: cleaned } as ResponseData);
}
