import { Request, Response } from "express";

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
    res.status(400).json({ error: "Chirp is too long" } as ResponseData);
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
