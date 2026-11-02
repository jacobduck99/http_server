import { loadEnvFile } from 'node:process';

loadEnvFile();

type APIConfig = {
    fileserverHits: number;
    dbURL: string; 
};

function envOrThrow(key: string): string {
    const value = process.env[key];
    if (!value) {
    throw new Error(`Environment variable ${key} is required`);
    }
    return value;
}

export const config: APIConfig = {
    fileserverHits: 0,
    dbURL: envOrThrow("DB_URL"),
}
