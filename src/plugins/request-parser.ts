import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import FastifyPlugin from 'fastify-plugin';

import { RequestContext } from '../types';

declare module 'fastify' {
  interface FastifyRequest {
    requestContext: RequestContext
  }
}
const plugin = async (fastify: FastifyInstance, opts: unknown): Promise<void> => {
  fastify.decorateRequest('requestContext', null);

  void fastify.addHook('preHandler', (request: FastifyRequest, reply: FastifyReply) => {
    const { body, params, query, headers } = request;

    request.requestContext = { body, params, query, headers };
  });
}

export default FastifyPlugin(plugin);
