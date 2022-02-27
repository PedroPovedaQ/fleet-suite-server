import { Module } from '@nestjs/common';
import { LoadsService } from './loads.service';
import { LoadsController } from './loads.controller';
import { DatabaseModule } from '../database/database.module';
import { FilesModule } from '../files/files.module';
import { LiveModule } from '../live/live.module';
import { BrokerageModule } from '../brokerage/brokerage.module';

@Module({
  imports: [DatabaseModule, FilesModule, LiveModule, BrokerageModule],
  controllers: [LoadsController],
  providers: [LoadsService],
})
export class LoadsModule {}
