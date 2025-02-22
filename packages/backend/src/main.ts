import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const allExceptions = app.get(AllExceptionsFilter);
  app.useGlobalFilters(allExceptions);

  app.use(compression());

  await app.listen(8080, "0.0.0.0");
}
bootstrap();
