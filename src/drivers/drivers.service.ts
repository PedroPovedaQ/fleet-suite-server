import { Driver as DriverModel } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../database/prisma.service';
import { UpdateDriverDto } from './dto/update-driver.dto';

const PER_PAGE = 5;
@Injectable()
export class DriversService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDriverDto: any) {
    return this.prismaService.driver.create({
      data: createDriverDto,
    });
  }

  //@TODO: Tighten this up so we only get what we asked for.
  async findAll(
    page: number = 0,
    per_page: number = PER_PAGE
  ): Promise<{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: DriverModel[];
  }> {
    page = Math.max(page, 1) - 1; //@TODO: put this in middleware somehow
    const result = await this.prismaService.$transaction([
      this.prismaService.driver.count(),
      this.prismaService.driver.findMany({
        skip: page * per_page,
        take: per_page,
        include: {
          truck: true,
          files: { include: { file_category: true } },
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

    //   page: number
    // per_page: number
    // total: number
    // total_pages: number
    // data: T[]
    // return this.prismaService.driver.findMany({
    //   skip: 0,
    //   take: 2,
    //   include: {
    //     truck: true,
    //     files: { include: { file_category: true } },
    //     comments: {
    //       include: { user: true, driver: true, truck: true },
    //       orderBy: {
    //         created: 'desc',
    //       },
    //     },
    //   },
    // });
  }

  findByQuery(driver_name: string, available = false) {
    if (available) {
      // return available trucks
      return this.prismaService.driver.findMany({
        take: 20,
        where: { truckId: null },
      });
    }
    if (!driver_name) {
      return this.prismaService.driver.findMany({
        take: 5,
      });
    }
    return this.prismaService.driver.findMany({
      take: 5,
      where: {
        OR: [
          {
            first_name: { contains: driver_name, mode: 'insensitive' },
          },
          { last_name: { contains: driver_name, mode: 'insensitive' } },
        ],
      },
    });
  }

  async findOne(id: number) {
    return this.prismaService.driver.findUnique({
      where: { id: Number(id) },
      include: {
        truck: true,
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

  async addTruck(driverId, truckId) {
    return this.prismaService.driver.update({
      where: { id: Number(driverId) || undefined },
      data: {
        truck: {
          connect: { id: truckId },
        },
      },
    });
  }

  update(id, data) {
    const { truckId, ...rest } = data;

    return this.prismaService.driver.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        truck:
          truckId !== undefined
            ? {
                connect: {
                  id: truckId,
                },
              }
            : { disconnect: true },
      },
    });
  }

  remove(id: number) {
    return this.prismaService.driver.delete({ where: { id: Number(id) } });
  }

  async addComment(driverId, userId, text: string) {
    // return this.prismaService.driver.findUnique({
    //   where: {
    //     id: driverId,
    //   },
    //   data: {
    //     comment: {
    //     },
    //   },
    // });
  }
}
