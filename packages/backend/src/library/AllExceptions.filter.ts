import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from "@nestjs/common";
import { ServiceError } from "@resync-games/api";

const convertToString = (exception: unknown) => {
  if ((exception as ServiceError).message !== undefined) {
    return (exception as ServiceError).message;
  }

  return JSON.stringify(exception);
};

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger("Exception");

  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const request = context.getRequest();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const serviceError: ServiceError = {
      code: httpStatus,
      message: convertToString(exception),
      path: request.url,
      type: "error"
    };

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(
        `Internal server error on ${request.url}: ${exception}`
      );
    }

    response.status(httpStatus).json(serviceError);
  }
}
