import request from "supertest";
import jwt from "jsonwebtoken";
import app from "./../../../../../src/app";

import userMock from "./mocks/user-mock.json";

import { User } from "../../../../../src/api/users/infrastructure/mongo-db/models/userSchema";
import MongoDbUserRepository from "../../../../../src/api/users/infrastructure/mongo-db/mongoDbUserRepository";

// Mock mongo db connection
jest.mock("../../../../../src/api/shared/infrastructure/mongoDbClient");

// Mock the User
jest.mock(
  "../../../../../src/api/users/infrastructure/mongo-db/models/userSchema"
);

// Mock MongoDbPostRepository
jest.mock(
  "../../../../../src/api/users/infrastructure/mongo-db/mongoDbUserRepository"
);

describe("Integration test to create user", () => {
  test("should return status code 200 when login is ok and user has all attributes in payload", async () => {
    // Mock the jwt.verify method to return the user ID
    const mockJwtVerify = jest.spyOn(jwt, "verify").mockReturnValue({
      _id: "test-user-id",
      iat: 1689996800,
      exp: 1690083200,
    } as any);

    (User.findOne as jest.Mock).mockResolvedValue({
      _id: "test-user-id",
      name: "testuser",
      email: "test@example.com",
    });

    const mockSaveUser = jest.fn();
    MongoDbUserRepository.prototype.saveUser = mockSaveUser;

    const res = await request(app)
      .post("/users")
      .set("Authorization", "Bearer valid_token")
      .send(userMock);

    expect(res.status).toBe(201);
    expect(mockJwtVerify).toHaveBeenCalledWith("valid_token", "secret-key");
    expect(mockSaveUser).toBeCalledTimes(1);
  });
});

describe("Integration test to get login user", () => {
  test("should return status code 200 when db response ok and payload is ok", async () => {
    const mockLoginUser = jest.fn();
    MongoDbUserRepository.prototype.loginUser = mockLoginUser;
    const res = await request(app).get("/users/login").send({
      email: userMock.email,
      password: userMock.password,
    });

    expect(res.status).toBe(200);
    expect(mockLoginUser).toBeCalledTimes(1);
  });
});
