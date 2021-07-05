// import { test } from 'tap'
// import Fastify from 'fastify'
// import Support from '../../src/plugins/support'

// test('support works standalone', async (t) => {
//   const fastify = Fastify()
//   void fastify.register(Support)
//   await fastify.ready()

//   t.equal(fastify.someSupport(), 'hugs')
// })

const add = (a: number, b: number) => a + b;
describe("test add function", () => {
  it("should return 15 for add(10,5)", () => {
    expect(add(10, 5)).toBe(15);
  });
it("should return 5 for add(2,3)", () => {
    expect(add(2, 3)).toBe(5);
  });
});
