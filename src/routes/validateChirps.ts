import { Request, Response } from "express";
import { BadRequest } from '../api/errors.js';
import { createUserChirp } from '../db/queries/users.js';

type ChirpParams = {
  body: string;
};

type ResponseData = {
  error?: string;
  valid?: boolean;
  cleanedBody?: string;
};

export async function handlerChirp(req: Request, res: Response){
    const params = req.body;

    if (typeof params?.body !== "string" || params.body.length > 140) {
    throw new BadRequest('Chirp is too long. Max length is 140', 400);
    return;
    }
        
    const userid = req.body.userid;

    const badWords = ["kerfuffle", "sharbert", "fornax"];

    const cleaned = params.body
    .split(" ")
    .map((word: string) =>
      badWords.includes(word.toLowerCase()) ? "****" : word
    )
    .join(" ");


    const userChirp = await createUserChirp(cleaned, userid);
    console.log("userChirp", userChirp);

    res.status(201).json(userChirp);
}
