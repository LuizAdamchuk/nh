import { Test, TestingModule } from '@nestjs/testing';
import { UsersWorkspaceController } from './users-workspace.controller';
import { UsersWorkspaceService } from './users-workspace.service';

describe('UsersWorkspaceController', () => {
  let controller: UsersWorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersWorkspaceController],
      providers: [UsersWorkspaceService],
    }).compile();

    controller = module.get<UsersWorkspaceController>(UsersWorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
