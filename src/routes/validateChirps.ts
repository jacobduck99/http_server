import { Request, Response } from "express";
import { BadRequest } from '../api/errors.js';
import { createUserChirp, getAllChirps } from '../db/queries/chirps.js';

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
        
    const badWords = ["kerfuffle", "sharbert", "fornax"];

    const cleaned = params.body
    .split(" ")
    .map((word: string) =>
      badWords.includes(word.toLowerCase()) ? "****" : word
    )
    .join(" ");


    const userChirp = await createUserChirp(cleaned, params.userId);
    console.log("userChirp", userChirp);

    res.status(201).json(userChirp);
}

export async function handlerGetAllChirps(req: Request, res: Response){
    const allChirps = await getAllChirps();
    res.status(200).json(allChirps);
}

export async function getChirpById(req: Request, res: Response){
    const path = req.params.chirpId;
    console.log("path", path);
}


