import { Test, TestingModule } from '@nestjs/testing';
import { QlikWorkspaceController } from './qlik-workspace.controller';
import { QlikWorkspaceService } from './qlik-workspace.service';

describe('QlikWorkspaceController', () => {
  let controller: QlikWorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QlikWorkspaceController],
      providers: [QlikWorkspaceService],
    }).compile();

    controller = module.get<QlikWorkspaceController>(QlikWorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
