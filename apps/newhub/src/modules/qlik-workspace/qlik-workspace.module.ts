import { Module } from '@nestjs/common';
import { QlikWorkspaceService } from './qlik-workspace.service';
import { QlikWorkspaceController } from './qlik-workspace.controller';

@Module({
  controllers: [QlikWorkspaceController],
  providers: [QlikWorkspaceService],
})
export class QlikWorkspaceModule {}
