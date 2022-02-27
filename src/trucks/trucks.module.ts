import { DatabaseModule } from './../database/database.module';
import { DriversModule } from '../drivers/drivers.module';
import { Module } from '@nestjs/common';
import { TrucksController } from './trucks.controller';
import { TrucksService } from './trucks.service';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [DriversModule, DatabaseModule, FilesModule],
  controllers: [TrucksController],
  providers: [TrucksService],
  exports: [TrucksService],
})
export class TrucksModule {}
