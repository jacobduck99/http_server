import express from "express";
import { type Request, type Response, type NextFunction } from 'express';
import { handlerReadiness } from './routes/readiness.js'
import { middlewareLogResponses, middlewareMetricsInc } from './api/middleware.js'

const app = express();
const PORT = 8080;

app.use('/app', middlewareMetricsInc);
app.use(middlewareLogResponses);
app.use('/app', express.static("./src/app"));
app.get('/healthz', handlerReadiness);  

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
