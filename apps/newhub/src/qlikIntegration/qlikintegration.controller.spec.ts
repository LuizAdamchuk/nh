import { Test, TestingModule } from '@nestjs/testing';
import { QlikintegrationController } from './qlikintegration.controller';
import { QlikintegrationService } from './qlikintegration.service';

describe('QlikintegrationController', () => {
  let controller: QlikintegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QlikintegrationController],
      providers: [QlikintegrationService],
    }).compile();

    controller = module.get<QlikintegrationController>(QlikintegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
