import express from "express";
import { type Request, type Response, type NextFunction } from 'express';

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction): void{
    res.on("finish", () => {
        const statusCode = res.status;
        console.log("here's status code", statusCode);
        

    });
}
