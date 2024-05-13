import { Module, forwardRef } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { OrganizationController } from "./organization.controller";
import { WorkspaceModule } from "../workspace/workspace.module";
import { OrganizationsWorkspaceModule } from "../organizations-workspace/organizations-workspace.module";
import { UserModule } from "../user/user.module";
import { OrganizationAccessControlService } from "./visualizationControl/visualizationControl";

@Module({
  imports: [WorkspaceModule, OrganizationsWorkspaceModule, UserModule],
  controllers: [OrganizationController],
  providers: [OrganizationService, OrganizationAccessControlService],
})
export class OrganizationModule {}
