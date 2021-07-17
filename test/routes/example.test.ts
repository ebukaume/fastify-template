import { FastifyInstance } from "fastify";
import { MongoMemoryServer } from "mongodb-memory-server";

import Util from "../../src/util";
import { createDatabase,createServer } from "../helper";

describe("example resources", () => {
  let server: FastifyInstance;
  let database: MongoMemoryServer;
  let util: Util;

  beforeAll(async () => {
    database = await createDatabase();
    server = await createServer(database.getUri());
    util = new Util();
  });

  afterAll(async () => {
    await server.close();
    await database.stop();
  });
  describe("GET /", () => {
    it("returns the list of examples", async () => {
      const { statusCode, payload } = await server.inject({
        url: "/example"
      });

      const examples = JSON.parse(payload);

      expect(statusCode).toBe(200);
      expect(util.deepType(examples)).toBe("array");
    });
  });
});
