import { Request, Response } from "express";

type responseData = {
    error?: string;
    valid?: boolean;
};

export function handler(req: Request, res: Response) {
    res.set({
        "Content-Type": "application/json"
    });

    let body = "";

    req.on("data", (chunk) => {
        body += chunk;
    });

    req.on("end", () => {
        try {
            const parsedBody = JSON.parse(body);
            if (parsedBody.body.length > 140) {
                const respBody: responseData = { error: "Chirp is too long" };
                res.status(400).send(JSON.stringify(respBody));
            } else {
                const respBody: responseData = { valid: true };
                res.status(200).send(JSON.stringify(respBody));
            }
        } catch (error) {
            const respBody: responseData = { error: "Something went wrong" };
            res.status(400).send(JSON.stringify(respBody));
        }
    });
}
