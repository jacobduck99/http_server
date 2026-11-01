import express from "express";
import { type Request, type Response, type NextFunction } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error("error, Something went wrong on our end");
  res.status(500).json({
    error: "Something went wrong on our end",
  });
}
