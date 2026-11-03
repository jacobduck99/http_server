import { loadEnvFile } from 'node:process';
import type { MigrationConfig } from "drizzle-orm/migrator";

loadEnvFile();

type APIConfig = {
    fileserverHits: number;
    port: number,
}

const migrationConfig: MigrationConfig = {
  migrationsFolder: "./src/db/migrations",
};;

type DBConfig = {
    url: string;
    migrationsFolder: MigrationConfig;
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
    },
    db : {
        url: config.db.url,    
        migrationsConfig: config.db.migrationConfig, 
}
}
