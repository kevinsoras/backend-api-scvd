import { describe } from "node:test";
import request from "supertest";
import { expect, test } from "vitest";
import { app } from "../app";

describe("Login Route Test", () => {
  test("Endpoint /login should correctly return the token", async () => {
    const userData = {
      email: "admin@gmail.com",
      password: "supersecret",
    };

    const response = await request(app).post("/login").send(userData);
    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(response.body.data.token).toBeTruthy();
  });
  test("Endpoint /login should return 401 for invalid credentials", async () => {
    const userData = {
      email: "invalid@gmail.com",
      password: "wrongpassword",
    };

    const response = await request(app).post("/login").send(userData);
    expect(response.statusCode).toBe(401);
  });

  test("Endpoint /login should return error for invalid user data", async () => {
    const invalidUserData = {
      email: "invalidemail", 
      password: "pass", 
    };

    const response = await request(app).post("/login").send(invalidUserData);
    expect(response.statusCode).toBe(400);
    expect(response.body.ok).toBe(false);
    expect(response.body.error).toBeTruthy();
    
  });
});