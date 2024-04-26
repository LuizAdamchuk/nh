import { Test, TestingModule } from "@nestjs/testing";
import { QlikIntegrationController } from "./qlik-integration.controller";
import { QlikIntegrationService } from "./qlik-integration.service";

describe("QlikintegrationController", () => {
  let controller: QlikIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QlikIntegrationController],
      providers: [QlikIntegrationService],
    }).compile();

    controller = module.get<QlikIntegrationController>(
      QlikIntegrationController
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
