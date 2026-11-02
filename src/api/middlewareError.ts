import express from "express";
import { type Request, type Response, type NextFunction } from 'express';
import { BadRequest, Unauthorized, Forbidden, NotFound } from './errors.js';

export function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction,
    ) {
    if (err instanceof BadRequest) {
    res.status(400).json({ error: err.message });
    } else if (err instanceof Unauthorized) {
    res.status(401).json({ error: err.message });
    } else if (err instanceof Forbidden) {
    res.status(403).json({ error: err.message });
    } else if (err instanceof NotFound) {
    res.status(404).json({ error: err.message });
    } else {
    console.error("Error:", err);
    res.status(500).json({ error: "Something went wrong on our end" });
    }
}
