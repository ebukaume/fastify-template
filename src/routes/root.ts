import { FastifyInstance,FastifyPluginAsync } from "fastify";

const root: FastifyPluginAsync = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get("/", async () => {
    return { root: true };
  });
};

export default root;
