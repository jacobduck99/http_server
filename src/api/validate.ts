import { BadRequest } from "./errors.js";

export type EmailPassword = { email: string; password: string };

// Checks a request body has a non-empty string email and password.
// Throws BadRequest (400) instead of letting bad input crash later as a 500.
export function parseEmailPassword(body: unknown): EmailPassword {
    if (typeof body !== "object" || body === null) {
        throw new BadRequest("request body must be a JSON object", 400);
    }
    const { email, password } = body as Record<string, unknown>;

    if (typeof email !== "string" || email.trim() === "") {
        throw new BadRequest("email is required", 400);
    }
    if (typeof password !== "string" || password === "") {
        throw new BadRequest("password is required", 400);
    }
    return { email: email.trim(), password };
}
