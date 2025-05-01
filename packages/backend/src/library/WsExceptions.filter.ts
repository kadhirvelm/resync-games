import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
  WsExceptionFilter
} from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { ServiceError } from "@/imports/api";
import { Socket } from "socket.io";

@Catch()
export class CustomWsExceptionFilter implements WsExceptionFilter {
  private logger = new Logger("WsException");

  catch(exception: WsException, host: ArgumentsHost) {
    const client = host.switchToWs().getClient();
    const data = host.switchToWs().getData();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const serviceError: ServiceError = {
      code: httpStatus,
      message: JSON.stringify(exception),
      path: "web-socket",
      type: "error"
    };

    this.logger.error(`${serviceError.message} ${JSON.stringify(data)}`);

    client.emit("exception", serviceError);
  }

  public customCatch(exception: Error, client: Socket, data: object) {
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const serviceError: ServiceError = {
      code: httpStatus,
      message: JSON.stringify(exception),
      path: "web-socket",
      type: "error"
    };

    this.logger.error(
      `Custom caught error: ${serviceError.message} ${JSON.stringify(data)}`
    );

    client.emit("exception", serviceError);
  }
}
