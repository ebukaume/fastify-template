import { FastifyReply } from "fastify/types/reply";

import ExampleService from "../services/example";
import { RequestContext } from "../types";
import Util from "../util";
import BaseHandler from "./base";

export default class ExampleHandler extends BaseHandler {
  util: Util;
  exampleService: ExampleService;

  constructor({ exampleService, util }: { exampleService: ExampleService, util: Util }) {
    super();

    this.util = util;
    this.exampleService = exampleService;
  }

  async getAllExamples() {
    return this.exampleService.findExamples();
  }
  
  async createExample(context: RequestContext, reply: FastifyReply) {
    try {
      const { body } = context;
  
      return this.exampleService.createExample(body);
    }
    catch (err) {
      if (!this.isHttpError(err)) throw err;

      const { statusCode, data } = this.util.formatErrorResponse(err);
      
      return reply.status(statusCode).send(data);
    }
  }
}
