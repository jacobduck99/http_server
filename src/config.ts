import { loadEnvFile } from 'node:process';
import type { MigrationConfig } from "drizzle-orm/migrator";

loadEnvFile();

type APIConfig = {
    fileserverHits: number;
    port: number,
    platform: string,
    jwt: string,
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};;

type DBConfig = {
    url: string;
    migrationConfig: MigrationConfig;
}

function envOrThrow(key: string): string {
    const value = process.env[key];
    if (!value) {
    throw new Error(`Environment variable ${key} is required`);
    }
    return value;
}

export const config = {
    api : {
        fileserverHits: 0,
        port: Number(envOrThrow("PORT")),    
        platform: envOrThrow("PLATFORM"),
        jwtToken: envOrThrow("JWT_SECRET"),
    },
    db : {
        url: envOrThrow("DB_URL"),    
        migrationConfig: migrationConfig, 
}
}
