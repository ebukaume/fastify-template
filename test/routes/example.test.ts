import { FastifyInstance } from 'fastify';
import { createServer } from '../helper'
import Util from "../../src/util"

describe('example resources', () => {
  let server: FastifyInstance;
  let util: Util;

  beforeAll(async () => {
    server = await createServer();
    util = new Util();
  })

  afterAll(async () => {
    server.close()
  })
  describe('GET /', () => {
    it('returns the list of examples', async () => {
      const { statusCode, payload } = await server.inject({
        url: '/example'
      });

      const examples = JSON.parse(payload);

      expect(statusCode).toBe(200);
      expect(util.deepType(examples)).toBe('array')
    });
  });
})
