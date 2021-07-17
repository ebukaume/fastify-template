import { FastifyPluginAsync } from "fastify";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import FastifyCORS from "fastify-cors";
import FastifySwagger from "fastify-swagger";
import { ConnectionOptions } from "mongoose";
import { join } from "path";

import DocumentationOptions from "./documentation";

export type AppOptions = {
  db?: {
    uri: string
    options?: ConnectionOptions,
  },
  cache?: {
    url: string,
    reconnectTries?: number,
    reconnectAfter?: number,
    reconnectTimeout?: number,
  }
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  server,
  opts
): Promise<void> => {

  void server.register(FastifyCORS);

  // Load all plugins defined in plugins
  void server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: {
      schemasDir: join(__dirname, "schemas"),
      ...opts,
    }
  });

  // Load this before routes as it uses onRoute hook to detect addition of routes
  // Loads documentation using swagger
  void server.register(FastifySwagger, DocumentationOptions);
  server.ready(err => {
    if (err) throw err;
    
    server.swagger();
  });

  // Loads all the routes (routes are defined as plugins)
  void server.register(AutoLoad, {
    dir: join(__dirname, "routes")
  });
};

export default app;
