import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ConverterService } from "./converter.service";

@Module({
  exports: [PrismaService],
  providers: [PrismaService, ConverterService]
})
export class PrismaModule {}
