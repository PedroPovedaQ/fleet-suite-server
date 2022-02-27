import { CreateLoadDto } from './dto/create-load.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateLoadDto } from './dto/update-load.dto';
import { parseISO } from 'date-fns';
import { LiveService } from '../live/live.service';
import { BrokerageService } from '../brokerage/brokerage.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class LoadsService {
  constructor(
    private readonly prismaService: PrismaService,
    private liveService: LiveService,
    private brokerageService: BrokerageService,
    private eventEmitter: EventEmitter2
  ) {}

  async create(data: any) {
    const {
      truck,
      trailerId,
      total_miles,
      comment,
      driver,
      driver_price_per_mile = '',
      ...rest
    } = data;
    let broker = null;
    if (rest.mc_number) {
      broker = await this.brokerageService.upsert(
        rest.mc_number?.mc_number ? rest.mc_number.mc_number : rest.mc_number
      );
      rest.mc_number = undefined;
    }
    const created = await this.prismaService.load.create({
      data: {
        ...rest,
        // date_start: parseISO('2021-11-19'),
        // date_end: parseISO('2021-11-22'),
        total_miles: Number(total_miles || 0),
        truck: {
          connect: {
            id: truck.id ?? truck,
          },
        },
        brokerage: {
          connect: {
            id: broker.id ?? broker,
          },
        },

        comments:
          comment && comment.length
            ? {
                create: {
                  text: comment,
                  user: { connect: { id: 1 } }, //@TODO: update to id of requesting user
                },
              }
            : undefined,
      },
      include: {
        brokerage: true,
        brokerageRep: true,
        truck: true,
        comments: {
          include: {
            user: true,
            driver: true,
            truck: { include: { location: true } },
          },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });

    this.liveService.broadcastEntityChange('load', 'create', created);
    return created;
  }

  async findAll(
    page: number = 0,
    per_page: number
  ): Promise<{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
  }> {
    per_page = Number(per_page);
    page = Math.max(page, 1) - 1; //@TODO: put this in middleware somehow
    // @TODO: THIS IS WHERE DISPATCH whereQuery gets defined.
    const whereQuery = {};
    const result = await this.prismaService.$transaction([
      this.prismaService.load.count(),
      this.prismaService.load.findMany({
        where: whereQuery,
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          truck: true,
          comments: {
            include: { user: true, driver: true, truck: true },
            orderBy: {
              created: 'desc',
            },
          },
        },
      }),
    ]);
    return {
      page,
      per_page,
      total: result[0],
      total_pages: Math.ceil(result[0] / per_page),
      data: result[1],
    };
  }

  findOne(id: number) {
    return this.prismaService.load.findUnique({
      where: { id: Number(id) },
      include: {
        brokerage: { include: { agents: true } },
        brokerageRep: true,
        truck: { include: { drivers: true, dispatcher: true } },
        files: { include: { file_category: true } },
        comments: {
          include: { user: true, driver: true, truck: true },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });
  }

  async updateStatus(id, data, userId, location): Promise<any> {
    if (!data.driverId) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'The driverId property is required.',
        },
        HttpStatus.BAD_REQUEST
      );
    }
    const [load, updateUser] = await this.prismaService.$transaction([
      this.prismaService.load.update({ where: { id: Number(id) }, data: {} }),
      this.prismaService.driver.count(),
    ]);
  }

  async update(id, data, userId: Number) {
    // @TODO: fix this somehow...
    data.userId = undefined;
    const { truckId, trailerId, driverId, brokerId, comment, ...rest } = data;

    const previous = await this.prismaService.load.findUnique({
      where: { id: Number(id) },
      select: {
        status: true,
      },
    });
    console.log(parseISO(rest.date_start));
    const updated = await this.prismaService.load.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        date_start: parseISO(rest.date_start),
        date_end: parseISO(rest.date_end),
        updatedAt: new Date(),
        route: rest.route ? rest.route : undefined,
        truck: truckId
          ? {
              connect: {
                id: truckId,
              },
            }
          : undefined,
        driver: driverId
          ? {
              connect: {
                id: driverId,
              },
            }
          : undefined,
        brokerage: brokerId
          ? {
              connect: {
                id: brokerId,
              },
            }
          : undefined,
        comments:
          comment && comment.length
            ? {
                create: {
                  text: comment,
                  user: { connect: { id: userId } },
                },
              }
            : undefined,
      },
      include: {
        truck: true,
        comments: {
          include: { user: true, driver: true, truck: true },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });
    this.liveService.broadcastEntityChange('load', 'update', updated);

    // Emit Events

    if (previous.status === 'SAVED' && updated.status === 'PENDING') {
    }
    return updated;
  }

  async remove(id: number) {
    id = Number(id);
    const deleteLoad = await this.prismaService.load.delete({ where: { id } });
    this.liveService.broadcastEntityChange('load', 'delete', id);
    return deleteLoad;
  }

  // @NOTE: Dispatch
  async findAllDispatch(): Promise<any> {
    // @TODO: THIS IS WHERE DISPATCH whereQuery gets defined.
    const whereQuery = {};
    return this.prismaService.load.findMany({
      // where: whereQuery,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        brokerage: true,
        truck: { include: { drivers: true } },
        files: true,
        comments: {
          include: { user: true, driver: true, truck: true },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });
  }
}
