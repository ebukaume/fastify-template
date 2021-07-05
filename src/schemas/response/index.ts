export default [
  {
    $id: 'response/examples',
    type: 'array',
    items: {
      $ref: 'shared/example'
    }
  },
  {
    $id: 'response/oneExample',
    type: 'object',
    properties: {
      author: {
        type: 'string'
      },
      slug: {
        type: 'string'
      }
    }
  },
];
