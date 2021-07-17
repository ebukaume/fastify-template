import { Model } from "mongoose";

import Example from "../models/example";

export default class ExampleRepository {
  exampleModel: Model<typeof Example>;

  constructor({ exampleModel }: { exampleModel: Model<typeof Example> }) {
    this.exampleModel = exampleModel;
  }

  async getExamples() {
    return this.exampleModel.find().limit(5).lean() ;
  }
  
  async createExample(data: unknown) {
    return this.exampleModel.create(data);
  }
}
