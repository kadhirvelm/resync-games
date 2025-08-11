import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./library/AllExceptions.filter";
import compression from "compression";
import { json, urlencoded } from "express";
import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: ".env.development" });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });

  const allExceptions = app.get(AllExceptionsFilter);
  app.useGlobalFilters(allExceptions);

  app.use(json({ limit: "10mb" }));
  app.use(urlencoded({ extended: true, limit: "10mb" }));

  app.use(compression());

  await app.listen(8080, process.env.PUBLIC_URL ?? "0.0.0.0");
}

bootstrap();
