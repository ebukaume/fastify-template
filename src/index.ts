"use strict";

import * as dotenv from "dotenv";
import Fastify from "fastify";
import Blipp from 'fastify-blipp';

import App from "./app";

dotenv.config();

// Instantiate Fastify with some config
const server = Fastify({
  logger: {
    prettyPrint: process.env.NODE_ENV !== 'prod'
  },
});

// This helps during development to list all registered routes
if (process.env.NODE_ENV === 'dev') {
  void server.register(Blipp);
}

// Register application as a normal plugin
void server.register(App, {
  db: {
    uri: 'mongodb://localhost:27017/test',
    options: {
      autoIndex: false,
    }
  },
  cache: {
    url: '',
  }
});

void server.addHook('onClose', (instance, done) => {
  instance.log.info('Server shutdown');
  done();
});

// Start listening
void server
  .listen({
    port: +process.env.PORT! || 3000,
    host: process.env.HOST || '127.0.0.1'
  })
  .then(() => process.env.NODE_ENV === 'dev' && server.blipp())
  .catch(err => {
    // server.log.error(err);
    process.exit(1);
  });

process.on('exit', server.close);
