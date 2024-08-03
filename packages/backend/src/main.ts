import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./filters/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  app.useGlobalFilters(app.get(AllExceptionsFilter));

  await app.listen(8080, "0.0.0.0");
}
bootstrap();
