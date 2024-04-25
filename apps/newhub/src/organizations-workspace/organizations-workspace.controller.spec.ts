import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsWorkspaceController } from './organizations-workspace.controller';
import { OrganizationsWorkspaceService } from './organizations-workspace.service';

describe('OrganizationsWorkspaceController', () => {
  let controller: OrganizationsWorkspaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsWorkspaceController],
      providers: [OrganizationsWorkspaceService],
    }).compile();

    controller = module.get<OrganizationsWorkspaceController>(OrganizationsWorkspaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
