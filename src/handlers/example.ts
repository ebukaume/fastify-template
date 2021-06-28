import ExampleService from '../services/example';

export default class ExampleHandler {
  exampleService: ExampleService;
  services: any;

  constructor({ exampleService }: { exampleService: ExampleService }) {
    this.exampleService = exampleService;
  };

  async getAllPosts() {
    const posts = await this.exampleService.findPosts();

    return posts;
  }
  
  async createPost() {
    const posts = await this.exampleService.createPost();

    return posts;
  }
};
