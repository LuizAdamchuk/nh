import { Module, forwardRef } from "@nestjs/common";
import { OrganizationService } from "./organization.service";
import { OrganizationController } from "./organization.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
