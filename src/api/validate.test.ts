import { describe, it, expect } from "vitest";
import { parseEmailPassword } from "./validate.js";
import { BadRequest } from "./errors.js";

describe("parseEmailPassword", () => {
    it("returns email and password when both are valid", () => {
        expect(parseEmailPassword({ email: " a@b.com ", password: "pw" }))
            .toEqual({ email: "a@b.com", password: "pw" });
    });

    it.each([
        ["body is undefined", undefined],
        ["body is not an object", "nope"],
        ["email is missing", { password: "pw" }],
        ["email is blank", { email: "  ", password: "pw" }],
        ["email is not a string", { email: 123, password: "pw" }],
        ["password is missing", { email: "a@b.com" }],
        ["password is empty", { email: "a@b.com", password: "" }],
    ])("throws BadRequest when %s", (_name, body) => {
        expect(() => parseEmailPassword(body)).toThrow(BadRequest);
    });
});
