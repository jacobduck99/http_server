import { describe, it, expect, beforeAll } from "vitest";
import { makeJWT, validateJWT, hashPassword, checkPasswordHash, extractBearerToken } from "./auth.js";
import { BadRequest } from '../api/errors.js';

describe("Password Hashing", () => {
    const password1 = "correctPassword123!";
    const password2 = "anotherPassword456!";
    let hash1: string;
    let hash2: string;

    beforeAll(async () => {
    hash1 = await hashPassword(password1);
    hash2 = await hashPassword(password2);
    });

    it("should return true for the correct password", async () => {
    const result = await checkPasswordHash(password1, hash1);
    expect(result).toBe(true);
    });
});

describe("Password Hashing", () => {
    const password1 = "correctPassword123!";
    const password2 = "anotherPassword456!";
    let hash1: string;
    let hash2: string;

    beforeAll(async () => {
        hash1 = await hashPassword(password1);
        hash2 = await hashPassword(password2);
    });

    it("should return true for the correct password", async () => {
        const result = await checkPasswordHash(password1, hash1);
        expect(result).toBe(true);
    });

    it("should return false for an incorrect password", async () => {
        const result = await checkPasswordHash("wrongPassword", hash1);
        expect(result).toBe(false);
    });

    it("should return false when the password doesn't match a different hash", async () => {
        const result = await checkPasswordHash(password1, hash2);
        expect(result).toBe(false);
    });

    it("should not return the plaintext password", () => {
        expect(hash1).not.toBe(password1);
    });

    it("should produce different hashes for the same password", async () => {
        const hashAgain = await hashPassword(password1);
        expect(hashAgain).not.toBe(hash1);
    });

    it("should return an argon2 encoded hash", () => {
        expect(hash1.startsWith("$argon2")).toBe(true);
    });
});

describe("extractBearerToken", () => {
    it("should return the token from a valid header", () => {
        const token = extractBearerToken("Bearer abc123");
        expect(token).toBe("abc123");
    });

    it("should handle extra whitespace around the header", () => {
        const token = extractBearerToken("  Bearer abc123  ");
        expect(token).toBe("abc123");
    });

    it("should throw BadRequest when the header is undefined", () => {
        expect(() => extractBearerToken(undefined)).toThrow(BadRequest);
    });

    it("should throw BadRequest when the header is empty", () => {
        expect(() => extractBearerToken("")).toThrow(BadRequest);
    });

    it("should throw BadRequest when the scheme isn't Bearer", () => {
        expect(() => extractBearerToken("Basic abc123")).toThrow(BadRequest);
    });

    it("should throw BadRequest when the token is missing", () => {
        expect(() => extractBearerToken("Bearer")).toThrow(BadRequest);
    });
});
