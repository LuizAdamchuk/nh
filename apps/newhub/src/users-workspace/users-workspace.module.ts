import { Module } from '@nestjs/common';
import { UsersWorkspaceService } from './users-workspace.service';
import { UsersWorkspaceController } from './users-workspace.controller';

@Module({
  controllers: [UsersWorkspaceController],
  providers: [UsersWorkspaceService],
})
export class UsersWorkspaceModule {}
