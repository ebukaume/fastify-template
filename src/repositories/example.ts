import { Model } from 'mongoose';

import Example from '../models/example';

export default class ExampleRepository {
  exampleModel: Model<typeof Example>;

  constructor({ exampleModel }: { exampleModel: Model<typeof Example> }) {
    this.exampleModel = exampleModel;
  }

  async getExamples() {
    return await this.exampleModel.find();
  }
  
  async createExample(data: unknown) {
    return await this.exampleModel.create(data);
  }
}
