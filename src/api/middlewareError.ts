import express from "express";
import { type Request, type Response, type NextFunction } from 'express';
import { BadRequest } from './errors.js';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
    if (err instanceof BadRequest){
        console.log("bad request");
          res.status(400).json({
            error: `${err.message}`,
  });
    }
  console.error("error, Something went wrong on our end");
}
