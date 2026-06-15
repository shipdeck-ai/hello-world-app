import { describe, it, expect } from "vitest";
import { env } from "./env.js";

describe("env", () => {
  it("should have PORT as a positive number", () => {
    expect(env.PORT).toBeGreaterThan(0);
    expect(typeof env.PORT).toBe("number");
  });

  it("should have DATABASE_URL as a string", () => {
    expect(typeof env.DATABASE_URL).toBe("string");
    expect(env.DATABASE_URL.length).toBeGreaterThan(0);
  });
});
