import { FastifyInstance } from 'fastify';
import { createServer } from '../helper'

describe('example is loaded', () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = await createServer();
  })

  afterAll(async () => {
    server.close()
  })
  it('responds when hit', async () => {
    const res = await server.inject({
      url: '/'
    })
  
    expect(JSON.parse(res.payload)).toEqual({ root: true });
  });

})
