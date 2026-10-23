import express from "express";
import { type Request, type Response, type NextFunction } from 'express';

export function middlewareLogResponses(req: Request, res: Response, next: NextFunction): void{
    res.on("finish", () => {
        const status = res.statusCode;
        if (status !== 200){
            console.log(`[NON-OK] ${req.method} ${req.url} - Status: ${status}`)
        } 
    });
        next(); 
}
