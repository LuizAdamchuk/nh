import { Injectable } from "@nestjs/common";
import { UserService } from "src/modules/user/user.service";

@Injectable()
export class OrganizationAccessControlService {
  constructor(protected readonly userService: UserService) {}

  async checkUserRole(user: any): Promise<any> {
    const roles = user.roles as string[];

    let visualizationControl;

    if (roles.includes("user")) {
      const userDetails = await this.userService.user({
        where: { id: user.id },
        select: {
          usersWorkspaces: {
            select: {
              id: true,
              workspace: {
                select: {
                  organizationsWorkspaces: true,
                },
              },
            },
          },
        },
      });

      const parsedUser = userDetails as unknown as any;

      const organizationIds = parsedUser.usersWorkspaces.flatMap(
        (workspace: any) =>
          workspace.workspace.organizationsWorkspaces.map(
            (orgWorkspace: any) => orgWorkspace.organizationId
          )
      );

      return (visualizationControl = { id: { in: organizationIds } });
    }

    if (roles.includes("owner")) {
      return (visualizationControl = { owner: { equals: user.id } });
    }
    return null;
  }
}
