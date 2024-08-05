import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus
} from "@nestjs/common";
import { ServiceError } from "@tiles-tbd/api";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
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

    response.status(httpStatus).json(serviceError);
  }
}
