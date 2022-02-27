import * as Joi from '@hapi/joi';

import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { DatabaseModule } from './database/database.module';
import { DriversModule } from './drivers/drivers.module';
import { Module } from '@nestjs/common';
import { TrucksModule } from './trucks/trucks.module';
import { UsersModule } from './users/users.module';
import { SharedModule } from './shared/shared.module';
import { FilesModule } from './files/files.module';
import { TrailersModule } from './trailers/trailers.module';
import { LogsModule } from './logs/logs.module';
import { LiveModule } from './live/live.module';
import { LoadsModule } from './loads/loads.module';
import { BrokerageModule } from './brokerage/brokerage.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    AuthenticationModule,
    EventEmitterModule.forRoot(),
    UsersModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // POSTGRES_HOST: Joi.string().required(),
        // POSTGRES_PORT: Joi.number().required(),
        // POSTGRES_USER: Joi.string().required(),
        // POSTGRES_PASSWORD: Joi.string().required(),
        // POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        AWS_REGION: Joi.string().required(),
        AWS_ACCESS_KEY_ID: Joi.string().required(),
        AWS_SECRET_ACCESS_KEY: Joi.string().required(),
        AWS_PRIVATE_BUCKET_NAME: Joi.string().required(),
      }),
    }),
    DriversModule,
    TrucksModule,
    DatabaseModule,
    SharedModule,
    FilesModule,
    TrailersModule,
    LogsModule,
    LiveModule,
    LoadsModule,
    BrokerageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// @TODO: Setting synchronize: true shouldn't be used in production
// - otherwise you can lose production data.
