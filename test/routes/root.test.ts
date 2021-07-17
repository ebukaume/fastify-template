import { FastifyInstance } from "fastify";
import { MongoMemoryServer } from "mongodb-memory-server";

import { createDatabase, createServer } from "../helper";

describe("example is loaded", () => {
  let server: FastifyInstance;
  let database: MongoMemoryServer;

  beforeAll(async () => {
    database = await createDatabase();
    server = await createServer(database.getUri());
  });

  afterAll(async () => {
    await server.close();
    await database.stop();
  });
  it("responds when hit", async () => {
    const res = await server.inject({
      url: "/"
    });
  
    expect(JSON.parse(res.payload)).toEqual({ root: true });
  });

});
