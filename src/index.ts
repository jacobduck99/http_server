import express from "express";
import { type Request, type Response, type NextFunction } from 'express';
import { handlerReadiness } from './routes/readiness.js'
import { handlerGetIncrement, handlerResetIncrement } from './routes/incrementResponse.js';
import { middlewareLogResponses, middlewareMetricsInc } from './api/middleware.js'
import { handlerChirp, handlerGetAllChirps, handlerGetChirpById } from './routes/validateChirps.js';
import { handlerCreateUser, handlerDeleteAllUsers, handlerLoginUser } from './routes/users.js';
import { handlerCheckToken } from './routes/refresh.js';
import { errorHandler } from './api/middlewareError.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use('/app', middlewareMetricsInc);
app.get('/admin/metrics', handlerGetIncrement);
app.post('/admin/reset', handlerDeleteAllUsers);
app.use(middlewareLogResponses);
app.use('/app', express.static("./src/app"));
app.get('/api/healthz', handlerReadiness);  
app.get('/api/chirps', handlerGetAllChirps);  
app.get('/api/chirps/:chirpId', handlerGetChirpById) 
app.post('/api/chirps', handlerChirp);
app.post('/api/users', handlerCreateUser);
app.post('/api/login', handlerLoginUser);
app.post('/api/refresh', handlerCheckToken); 
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
