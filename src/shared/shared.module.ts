import { CacheModule, Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { MapsController } from './maps.controller';
import { MapsService } from './maps.service';

@Module({
  imports: [CacheModule.register(), DatabaseModule],
  controllers: [CommentController, CategoryController, MapsController],
  providers: [CommentService, CategoryService, MapsService],
})
export class SharedModule {}
// @TODO: use redis?
// CacheModule.register({
//   store: redisStore,
//   host: 'localhost',
//   port: 6379,
// }),
