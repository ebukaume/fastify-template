import { FastifyPluginAsync } from "fastify";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { ConnectionOptions } from "mongoose";
import { join } from "path";

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
  // Load all plugins defined in plugins
  void server.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: {
      schemasDir: join(__dirname, "schemas"),
      ...opts,
    }
  });

  // Loads all the routes (routes are defined as plugins)
  void server.register(AutoLoad, {
    dir: join(__dirname, "routes")
  });
};

export default app;
export { app };
