import request from "supertest";
import app from "../index.js";

describe("Test ping path", () => {
  test("status code should be 200 with success is true", async () => {
    const response = await request(app).get("/api/ping");
    expect(response.statusCode).toBe(200);
    expect(response.body.success).toEqual(true);
  });
});
