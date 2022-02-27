import { Module } from '@nestjs/common';
import { TrailersService } from './trailers.service';
import { TrailersController } from './trailers.controller';
import { DatabaseModule } from '../database/database.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [DatabaseModule, FilesModule],
  controllers: [TrailersController],
  providers: [TrailersService],
})
export class TrailersModule {}
