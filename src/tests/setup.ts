import { beforeEach, beforeAll, afterAll } from "bun:test";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import config from "../config";
// import Api from "../api";

// const app = Api.app;

let mongo: MongoMemoryServer;
beforeAll(async () => {
  try {
    config.jwtSecret;

    // Start MongoDB In-memory server
    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
  } catch (err) {
    console.log("Couldn't start MongoDB In-memory server, exiting...");
    process.exit(1);
  }
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  let signup: () => Promise<Array<string>>;
}

// global.signup = async (): Promise<Array<string>> => {
//   const email = "test@test.com";
//   const password = "password";

//   // const response = await request(app)
//   //   .post("/api/users/signup")
//   //   .send({ email, password })
//   //   .expect(201);

//   // return response.get("Set-Cookie");

//   return [email, password];
// };
