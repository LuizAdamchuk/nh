import { Module } from "@nestjs/common";
import { OrganizationsWorkspaceService } from "./organizations-workspace.service";
import { OrganizationsWorkspaceController } from "./organizations-workspace.controller";

@Module({
  controllers: [OrganizationsWorkspaceController],
  providers: [OrganizationsWorkspaceService],
  exports: [OrganizationsWorkspaceService],
})
export class OrganizationsWorkspaceModule {}
