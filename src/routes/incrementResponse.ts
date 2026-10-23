import { Request, Response } from "express";
import { config } from '../config.js'; 

export function handlerGetIncrement(req: Request, res: Response) {
  res.set({
    "Content-Type": 'text/plain; charset=utf-8'
  });
  res.send(`Hits: ${config.fileserverHits}`); 
}

export function handlerResetIncrement(req: Request, res: Response) {
  res.set({
    "Content-Type": 'text/plain; charset=utf-8'
  });
  res.send(config.fileserverHits = 0); 
}

