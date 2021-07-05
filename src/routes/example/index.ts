import { FastifyPluginAsync } from "fastify"

import ExampleHandler from "../../handlers/example";

const example: FastifyPluginAsync =async (fastify, opts): Promise<void> => {
  const handler: ExampleHandler = fastify.container.resolve('exampleHandler');
  
  fastify.route({
    url: "/",
    method: "GET",
    handler: (request, reply) => handler.getAllExamples(),
  });

  fastify.route({
    url: "/",
    method: "POST",
    schema: {
      body: fastify.getSchema('request/examples'),
      response: {
        '2xx': fastify.getSchema('response/oneExample')
      },
    },
    handler: (request, reply) => handler.createExample(request.requestContext, reply),
  });
}

export default example;
