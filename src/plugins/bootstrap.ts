import { asClass,asValue,AwilixContainer, createContainer, Lifetime } from "awilix";
import { FastifyInstance } from "fastify";
import FastifyPlugin from "fastify-plugin";
import { createClient, RetryStrategy } from "redis";

import HttpErrorFactory from "../errors/http-error-factory";
import Util from "../util";

declare module "fastify" {
  interface FastifyInstance {
    container: AwilixContainer,
  }
}

interface CacheOptions {
  url: string,
  reconnectTries: number,
  reconnectAfter: number,
  reconnectTimeout: number,
}

interface BootstrapPluginOption {
  cache: CacheOptions
}

const injectCache = async (container: AwilixContainer, fastify: FastifyInstance, cacheOptions: CacheOptions): Promise<void> => {
  const { url, reconnectTries = 10, reconnectAfter = 500, reconnectTimeout = 30000 } = cacheOptions;
  const namespace = "[Cache]";
  
  try {
    const retryStrategy: RetryStrategy = ({ attempt, total_retry_time, error }) => {
      fastify.log.warn(`${namespace} Trying to reconnect to redis... Attempt no: ${attempt}. Error details: ${JSON.stringify(error)}`);
      
      if (attempt > reconnectTries) {
        throw new Error(`${namespace} Reconnecting attempt limit exhausted`);
      }
      if (total_retry_time > reconnectTimeout) {
        throw new Error(`${namespace} Retry time exhausted`);
      }
      // it tries to reconnect after x milliseconds where the x is the return value of this function
      return reconnectAfter;
    };
    
    const client = await createClient({ url, retry_strategy: retryStrategy });
    client.on("ready", () => fastify.log.info(`${namespace} Connected!`));
    client.on("error", err => fastify.log.error(`${namespace} Error: ${err}`));

    container.register({ cache: asValue(client) });
  }
  catch (error) {
    fastify.log.error(`${namespace} Error: ${error}`);
  }
};

const plugin = async (fastify: FastifyInstance, opts: BootstrapPluginOption): Promise<void> => {
  const namespace = "[Bootstrap]";
  const container = createContainer();

  if (opts.cache?.url) await injectCache(container, fastify, opts.cache);

  // load http error creator
  container.register({ httpError: asClass(HttpErrorFactory).singleton() });

  // load util class
  container.register({ util: asClass(Util).singleton() });

  // load models
  container.loadModules(
    ["../models/*.ts"],
    {
      cwd: __dirname,
      formatName: filename => filename + "Model",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON
      }
    },
  );

  // load repositories
  container.loadModules(
    ["../repositories/*.ts"],
    {
      cwd: __dirname,
      formatName: filename => filename + "Repository",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
    },
  );

  // load services
  container.loadModules(
    ["../services/*.ts"],
    {
      cwd: __dirname,
      formatName: filename => filename + "Service",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
    },
  );

  // load jobs
  container.loadModules(
    ["../jobs/*.ts"],
    {
      cwd: __dirname,
      formatName: filename => filename + "Job",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
    },
  );

  // load gateways
  container.loadModules(
    ["../gateways/*.ts"],
    {
      cwd: __dirname,
      formatName: filename => filename + "Gateway",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
    },
  );

  // load handlers
  container.loadModules(
    ["../handlers/*.ts"],
    {
      cwd: __dirname,
      formatName: filename => filename + "Handler",
      resolverOptions: {
        lifetime: Lifetime.SINGLETON,
      },
    },
  );

  fastify.decorate("container", container);

  fastify.log.info(`${namespace} Loaded all resources into awilix container`);
};

export default FastifyPlugin(plugin);
