import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsWorkspaceService } from './organizations-workspace.service';

describe('OrganizationsWorkspaceService', () => {
  let service: OrganizationsWorkspaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganizationsWorkspaceService],
    }).compile();

    service = module.get<OrganizationsWorkspaceService>(OrganizationsWorkspaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
