import ExampleModel from '../models/example';
import { Model } from 'mongoose';

export default class ExampleRepository {
  exampleModel: Model<typeof ExampleModel>;

  constructor({ exampleModel }: { exampleModel: Model<typeof ExampleModel> }) {
    this.exampleModel = exampleModel;
  };

  async getPosts() {
    const posts = await this.exampleModel.find();

    return posts;
  }
  
  async createPost() {
    const posts = await this.exampleModel.create();

    return posts;
  }
};
