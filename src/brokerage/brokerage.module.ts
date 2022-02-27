import { Module } from '@nestjs/common';
import { BrokerageService } from './brokerage.service';
import { BrokerageController } from './brokerage.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [BrokerageController],
  providers: [BrokerageService],
  exports: [BrokerageService],
})
export class BrokerageModule {}
