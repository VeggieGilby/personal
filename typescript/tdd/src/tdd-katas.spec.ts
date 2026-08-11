import { describe, expect, it } from "vitest";
import { hello } from "./tdd-katas.ts";

describe("hello", () => {
  it("returns Hello world", () => {
    expect(hello()).toBe("Hello world");
  });
});