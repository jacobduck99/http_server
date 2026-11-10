import { Request, Response } from "express";
import { BadRequest, NotFound, Forbidden } from '../api/errors.js';
import { createUserChirp, getAllChirps, getChirpById, deleteChirpById, getChirpsByAuthorId } from '../db/queries/chirps.js';
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

export async function handlerGetAllChirps(req: Request, res: Response) {
    const { authorId, sort } = req.query;

    if (authorId === undefined || sort === undefined) {
        const allChirps = await getAllChirps();
        res.status(200).json(allChirps);
        return;
    }

    if (sort === 'desc'){
        const allChirps = await getAllChirps();
        const reversed = allChirps.toReversed();
        console.log("here's before reversed", allChirps);
        console.log("reversed", reversed);
        res.status(200).json(reversed);
        return;
    }

    if (typeof authorId !== "string") {
        res.status(400).json({ error: "authorId must be a single string" });
        return;
    }

    const chirpsByAuthor = await getChirpsByAuthorId(authorId);
    res.status(200).json(chirpsByAuthor);
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
    const { chirpId } = path;
    let coerced = chirpId.toString();
    const lookUpChirp = await getChirpById(coerced);
    if (lookUpChirp === undefined){
        throw new NotFound("chirp not found", 404);
    } else if (lookUpChirp.userId !== userId){
        throw new Forbidden("user does not have access to this chirp", 403);
    } else {
        const deleteChirp = await deleteChirpById(userId, coerced);
        res.status(204).end();
    }

}


