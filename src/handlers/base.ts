
import { HttpError } from "http-errors";

export default class BaseHandler {
  protected isHttpError(error: unknown): boolean {
    return error instanceof HttpError;
  }
}
