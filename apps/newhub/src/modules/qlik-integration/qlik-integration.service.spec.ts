import { Test, TestingModule } from "@nestjs/testing";
import { QlikIntegrationService } from "./qlik-integration.service";

describe("QlikintegrationService", () => {
  let service: QlikIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QlikIntegrationService],
    }).compile();

    service = module.get<QlikIntegrationService>(QlikIntegrationService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
