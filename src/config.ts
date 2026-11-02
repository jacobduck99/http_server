import { loadEnvFile } from 'node:process';

loadEnvFile();

type APIConfig = {
    fileserverHits: number;
    dbUrl: string;
    
};

export const config: APIConfig = {
    fileserverHits: 0,
    dbUrl: process.env.DB_Url,
}
