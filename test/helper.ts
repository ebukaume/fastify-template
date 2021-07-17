// This file contains code that we reuse between our tests.
import Fastify from 'fastify'
import App from '../src/app'

// Fill in this config with all the configurations
// needed for testing the application
async function config () {
  return {};
}

// Automatically build and tear down our instance
async function createServer () {
  const server = Fastify();

  // Register application as a normal plugin
  void server.register(App, {
    db: { uri: 'mongodb://localhost:27017/test' },
    cache: { url: '' }
  });

  await server.ready();

  return server;
}

export {
  config,
  createServer
}
