import { it, describe, expect } from "bun:test";
import Api from "../../../../api";

const app = Api.app;

describe("Sign up test suite", () => {
  it("Should return 200 Response", async () => {
    const req = new Request("http://localhost:5000/");

    const res = await app.fetch(req);
    expect(res.status).toBe(200);
  });
});
