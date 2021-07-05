import HttpErrorFactory from '../errors/http-error-factory';
import ExampleRepository from '../repositories/example'

export default class ExampleService {
  exampleRepository: ExampleRepository;
  httpError: HttpErrorFactory;

  constructor({ exampleRepository, httpError }: { exampleRepository: ExampleRepository, httpError: HttpErrorFactory }) {
    this.exampleRepository = exampleRepository;
    this.httpError = httpError;
  }

  async findExamples() {
    return await this.exampleRepository.getExamples();
  }
  
  async createExample(data: unknown) {
    throw this.httpError.tooManyRequests('test');
    return await this.exampleRepository.createExample(data);
  }
}
