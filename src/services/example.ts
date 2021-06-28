import ExampleRepository from '../repository/exampple';

export default class ExampleService {
  exampleRepository: ExampleRepository;

  constructor({ exampleRepository }: { exampleRepository: ExampleRepository }) {
    this.exampleRepository = exampleRepository;
  };

  async findPosts() {
    const posts = await this.exampleRepository.getPosts();

    return posts;
  }
  
  async createPost() {
    const posts = await this.exampleRepository.createPost();

    return posts;
  }
};
