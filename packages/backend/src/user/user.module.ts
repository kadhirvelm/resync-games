import { ResyncGamesPrismaModule } from "@/database/resyncGamesPrisma.module";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  exports: [UserService],
  imports: [ResyncGamesPrismaModule],
  providers: [UserService]
})
export class UserModule {}
