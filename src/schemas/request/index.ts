export default [
  {
    $id: 'request/examples',
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 3 },
      author: { type: 'string', minLength: 3 },
      content: { type: 'string', minLength: 3 },
      published: { type: 'boolean' },
      tags: { type: 'array' }
    },
    required: [ 'title', 'author', 'content', 'tags' ],
    additionalProperties: false,
  }
];
