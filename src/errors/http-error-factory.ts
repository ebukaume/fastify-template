import { STATUS_CODES } from 'http'
import createError, { HttpError } from 'http-errors'

export default class HttpErrorFactory extends Error {
  statusCodesMap: {
    [errorCode: string]: string | undefined;
    [errorCode: number]: string | undefined;
  };

  constructor() {
    super();

    this.statusCodesMap = { ...STATUS_CODES };
    this.init();
  }

  badRequest(message: string): HttpError {
    return new createError.BadRequest(message)
  }

  unauthorized(message: string): HttpError {
    return new createError.Unauthorized(message)
  }

  paymentRequired (message: string): HttpError {
    return new createError.PaymentRequired(message)
  }

  forbidden (message: string): HttpError {
    return new createError.Forbidden(message)
  }

  notFound (message: string): HttpError {
    return new createError.NotFound(message)
  }

  methodNotAllowed (message: string): HttpError {
    return new createError.MethodNotAllowed(message)
  }

  notAcceptable (message: string): HttpError {
    return new createError.NotAcceptable(message)
  }

  proxyAuthenticationRequired (message: string): HttpError {
    return new createError.ProxyAuthenticationRequired(message)
  }

  requestTimeout (message: string): HttpError {
    return new createError.RequestTimeout(message)
  }

  conflict (message: string): HttpError {
    return new createError.Conflict(message)
  }

  gone (message: string): HttpError {
    return new createError.Gone(message)
  }

  lengthRequired (message: string): HttpError {
    return new createError.LengthRequired(message)
  }

  preconditionFailed (message: string): HttpError {
    return new createError.PreconditionFailed(message)
  }

  payloadTooLarge (message: string): HttpError {
    return new createError.PayloadTooLarge(message)
  }

  uriTooLong (message: string): HttpError {
    return new createError.URITooLong(message)
  }

  unsupportedMediaType (message: string): HttpError {
    return new createError.UnsupportedMediaType(message)
  }

  rangeNotSatisfiable (message: string): HttpError {
    return new createError.RangeNotSatisfiable(message)
  }

  expectationFailed (message: string): HttpError {
    return new createError.ExpectationFailed(message)
  }

  imateapot (message: string): HttpError {
    return new createError.ImATeapot(message)
  }

  misdirectedRequest (message: string): HttpError {
    return new createError.MisdirectedRequest(message)
  }

  unprocessableEntity (message: string): HttpError {
    return new createError.UnprocessableEntity(message)
  }

  locked (message: string): HttpError {
    return new createError.Locked(message)
  }

  failedDependency (message: string): HttpError {
    return new createError.FailedDependency(message)
  }

  unorderedCollection (message: string): HttpError {
    return new createError.UnorderedCollection(message)
  }

  upgradeRequired (message: string): HttpError {
    return new createError.UpgradeRequired(message)
  }

  preconditionRequired (message: string): HttpError {
    return new createError.PreconditionRequired(message)
  }

  tooManyRequests (message: string): HttpError {
    return new createError.TooManyRequests(message)
  }

  requestHeaderFieldsTooLarge (message: string): HttpError {
    return new createError.RequestHeaderFieldsTooLarge(message)
  }

  unavailableForLegalReasons (message: string): HttpError {
    return new createError.UnavailableForLegalReasons(message)
  }

  internalServerError (message: string): HttpError {
    const error = new createError.InternalServerError(message)
    // mark error as explicit to allow custom message
    error.explicitInternalServerError = true
    return error
  }

  notImplemented (message: string): HttpError {
    return new createError.NotImplemented(message)
  }

  badGateway (message: string): HttpError {
    return new createError.BadGateway(message)
  }

  serviceUnavailable (message: string): HttpError {
    return new createError.ServiceUnavailable(message)
  }

  gatewayTimeout (message: string): HttpError {
    return new createError.GatewayTimeout(message)
  }

  httpVersionNotSupported (message: string): HttpError {
    return new createError.HTTPVersionNotSupported(message)
  }

  variantAlsoNegotiates (message: string): HttpError {
    return new createError.VariantAlsoNegotiates(message)
  }

  insufficientStorage (message: string): HttpError {
    return new createError.InsufficientStorage(message)
  }

  loopDetected (message: string): HttpError {
    return new createError.LoopDetected(message)
  }

  bandwidthLimitExceeded (message: string): HttpError {
    return new createError.BandwidthLimitExceeded(message)
  }

  notExtended (message: string): HttpError {
    return new createError.NotExtended(message)
  }

  networkAuthenticationRequired (message: string): HttpError {
    return new createError.NetworkAuthenticationRequired(message)
  }

  private init(): void {
    Object.keys(STATUS_CODES).forEach(code => {
      this.statusCodesMap[code] = this.normalize(code, this.statusCodesMap[code]!)
    })
  }

  private normalize(code: string, message: string): string{
    if (code === '414') return 'uriTooLong';
    if (code === '505') return 'httpVersionNotSupported';

    message = message.split(' ').join('').replace(/'/g, '');
    message = message[0].toLowerCase() + message.slice(1);

    return message;
  }
}
