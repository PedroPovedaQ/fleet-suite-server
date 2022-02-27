import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();

    // @INFO: For future middleware, check out: https://stackoverflow.com/questions/69581717/where-is-the-beest-place-to-put-prisma-middleware-on-nestjs
    // this.$use(async (params, next) => {
    //   console.log(params);
    //   const result = await next(params);
    //   console.log(result, 'done');
    //   console.log('done');
    //   // See results here
    //   return result;
    //   // console.log(params);
    //   // next(params);
    //   // if (
    //   //   params.model == 'Driver' &&
    //   //   (params.action == 'update' || params.action == 'create')
    //   // ) {
    //   //   // Logic only runs for delete action and Post model
    //   //   console.log(params, 'hi params');
    //   //   // this.truck.findFirst()
    //   // }
    // });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
