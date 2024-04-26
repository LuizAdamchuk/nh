import { Test, TestingModule } from '@nestjs/testing';
import { UsersWorkspaceService } from './users-workspace.service';

describe('UsersWorkspaceService', () => {
  let service: UsersWorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersWorkspaceService],
    }).compile();

    service = module.get<UsersWorkspaceService>(UsersWorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
