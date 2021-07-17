// This file contains code that we reuse between our tests.
import Fastify, { FastifyInstance } from "fastify";
import { MongoMemoryServer } from "mongodb-memory-server";

import App from "../src/app";

// Fill in this config with all the configurations
// needed for testing the application
async function config () {
  return {};
}

// Automatically build and tear down our instance
async function createServer (uri: string): Promise<FastifyInstance> {
  const server = Fastify();

  // Register application as a normal plugin
  void server.register(App, {
    db: { uri },
    cache: { url: "" }
  });

  await server.ready();

  return server;
}

const createDatabase = async (): Promise<MongoMemoryServer> => {
  // Extend the default timeout so MongoDB binaries can download
  jest.setTimeout(60000);

  return MongoMemoryServer.create();
};

export {
  config,
  createDatabase,
  createServer,
};
