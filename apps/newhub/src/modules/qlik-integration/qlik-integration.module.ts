import { Module } from "@nestjs/common";
import { QlikIntegrationService } from "./qlik-integration.service";
import { QlikIntegrationController } from "./qlik-integration.controller";

@Module({
  controllers: [QlikIntegrationController],
  providers: [QlikIntegrationService],
})
export class QlikIntegrationModule {}
