import { Request, Response } from "express";
import { BadRequest } from '../api/errors.js';
import { createUserChirp, getAllChirps, getChirpById } from '../db/queries/chirps.js';
import { NotFound } from '../api/errors.js';
import { extractBearerToken, validateJWT, getBearerToken } from '../auth/auth.js';
import { config } from '../config.js';

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

    const header = req.get('Authorization') 
    const getToken = extractBearerToken(header); 
    const secret = config.api.jwtToken;
    const userId = validateJWT(getToken, secret);
    const userChirp = await createUserChirp(cleaned, userId);
    console.log("userChirp", userChirp);

    res.status(201).json(userChirp);
}

export async function handlerGetAllChirps(req: Request, res: Response){
    const allChirps = await getAllChirps();
    res.status(200).json(allChirps);
}

export async function handlerGetChirpById(req: Request, res: Response){
    const path = req.params;
    const id = path.chirpId as any;
    const chirpById = await getChirpById(id);
    if (chirpById === undefined){
        throw new NotFound("chirp not found", 404);
    }
    res.status(200).json(chirpById);
}

export async function handlerDeleteChirpById(req: Request, res: Response){
    const bearerToken = getBearerToken(req);
    const secret = config.api.jwtToken;
    const userId = validateJWT(bearerToken, secret);
    const path = req.params;
    const chirpId = path.chirpId;

}


