import { Test, TestingModule } from '@nestjs/testing';
import { QlikintegrationService } from './qlikintegration.service';

describe('QlikintegrationService', () => {
  let service: QlikintegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QlikintegrationService],
    }).compile();

    service = module.get<QlikintegrationService>(QlikintegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
