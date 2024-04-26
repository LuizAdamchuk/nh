import { Test, TestingModule } from '@nestjs/testing';
import { QlikWorkspaceService } from './qlik-workspace.service';

describe('QlikWorkspaceService', () => {
  let service: QlikWorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QlikWorkspaceService],
    }).compile();

    service = module.get<QlikWorkspaceService>(QlikWorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
