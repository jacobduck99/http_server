import { Request, Response } from "express";

type ChirpParams = {
  body: string;
};

type ResponseData = {
  error?: string;
  valid?: boolean;
};

export function handler(req: Request, res: Response) {
    const params = req.body;
    console.log(typeof params.body);

    if (typeof params?.body !== "string" || params.body.length > 140) {
    const respBody: ResponseData = { error: "Chirp is too long" };
    res.status(400).json(respBody);
    return;
    }

    const respBody: ResponseData = { valid: true }; 
    const badWord: string[] = [ "fornax", "kerfuffle", "sharbert" ];
    
    if (typeof params?.body === "string" || params.body.length < 140) {
        console.log("is this working fuck me", params.body);
        if (params.body.includes("fornax")){
            console.log(params.body.replace("fornax", "****"))
            console.log("here's params body", params.body)
        }
    console.log(typeof badWord);
    }

    // if ( badWord in paramsString){
    //     console.log("here is bad word", badWord);
    // }
    res.status(200).json(respBody);
}
