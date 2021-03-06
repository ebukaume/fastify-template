import { HttpError } from "fastify-sensible/lib/httpError";

interface iErrorResponse {
  statusCode: number,
  data: unknown,
}
export default class Util {
  formatErrorResponse(error: HttpError): iErrorResponse {
    const { name, statusCode, message } = error;

    return {
      statusCode,
      data: {
        statusCode,
        name,
        message
      },
    };
  }

  deepType(value: unknown): string {
    return Object
      .prototype
      .toString
      .apply(value)
      .slice(8, -1)
      .toLowerCase();
  }
}
