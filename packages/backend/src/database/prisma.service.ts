import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@tiles-tbd/database";
import { ConverterService } from "./converter.service";

@Injectable()
export class PrismaService {
  public client: PrismaClient;

  constructor(public converterService: ConverterService) {
    this.client = new PrismaClient({ log: ["query"] });
  }
}
