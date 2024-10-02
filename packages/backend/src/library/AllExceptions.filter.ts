import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from "@nestjs/common";
import { ServiceError } from "@resync-games/api";

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
      message: JSON.stringify(exception),
      path: request.url,
      type: "error"
    };

    this.logger.error(`Error on ${request.url}: ${exception}`);

    response.status(httpStatus).json(serviceError);
  }
}
