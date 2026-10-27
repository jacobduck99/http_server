import express from "express";
import { type Request, type Response, type NextFunction } from 'express';
import { handlerReadiness } from './routes/readiness.js'
import { handlerGetIncrement, handlerResetIncrement } from './routes/incrementResponse.js';
import { middlewareLogResponses, middlewareMetricsInc } from './api/middleware.js'
import { handlerChirpsValidate } from './routes/chars.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/app', middlewareMetricsInc);
app.get('/admin/metrics', handlerGetIncrement);
app.post('/admin/reset', handlerResetIncrement);
app.use(middlewareLogResponses);
app.use('/app', express.static("./src/app"));
app.get('/api/healthz', handlerReadiness);  
app.post('/api/validate_chirp', handlerChirpsValidate);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
