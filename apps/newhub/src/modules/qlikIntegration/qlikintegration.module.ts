import { Module } from "@nestjs/common";
import { QlikIntegrationService } from "./qlikintegration.service";
import { QlikIntegrationController } from "./qlikintegration.controller";

@Module({
  controllers: [QlikIntegrationController],
  providers: [QlikIntegrationService],
})
export class QlikintegrationModule {}
