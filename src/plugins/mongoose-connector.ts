import { FastifyInstance } from 'fastify';
import FastifyPlugin from "fastify-plugin";
import * as mongoose from 'mongoose';
import { Connection, ConnectionOptions } from 'mongoose';

import { AppOptions } from '../app';
import { MongooseLoaderPluginOptions } from '../types';

declare module 'fastify' {
  interface FastifyInstance {
    db: Connection
  }
}

const plugin = async (fastify: FastifyInstance, opts: AppOptions): Promise<void> => {
  if (!opts.db) return;
  
  const { uri, options } = opts.db!;
  const logNamespace = `[Database]`;
  
  const DEFAULT_OPTIONS: ConnectionOptions = {
    autoIndex: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(uri, { ...DEFAULT_OPTIONS, ...options });

    fastify.log.info(`${logNamespace} Connected!`);
    
    mongoose.connection.on('disconnected', () => fastify.log.warn(`${logNamespace} Disconnected!`));
    mongoose.connection.on('reconnected', () => fastify.log.info(`${logNamespace} Reconnected!`));
    mongoose.connection.on('error', () => fastify.log.error(`${logNamespace} Error!`));
    
    fastify.addHook('onClose', () => mongoose.connection.close());
  } catch (error) {
    fastify.log.error(`${logNamespace} Error: ${error}`);
  }
};

export default FastifyPlugin<MongooseLoaderPluginOptions>(plugin);
