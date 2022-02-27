import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Truck as TruckModel, User as UserModel } from '@prisma/client';

import { CreateTruckDto } from './dto/create-truck.dto';
import { PrismaService } from './../database/prisma.service';
import { UpdateTruckDto } from './dto/update-truck.dto';
import { parseISO } from 'date-fns';
const commentOptions = {
  include: { user: true, driver: true, truck: true },
  orderBy: {
    created: 'desc',
  },
};
const PER_PAGE = 5;

@Injectable()
export class TrucksService {
  constructor(private readonly prismaService: PrismaService) {}
  create(createTruckDto: any) {
    const { drivers, trailerId, ...rest } = createTruckDto;

    return this.prismaService.truck.create({
      data: {
        ...rest,
        drivers:
          drivers != null && drivers.length
            ? {
                connect: drivers.map((driver) => ({ id: driver })),
              }
            : undefined,

        trailer:
          trailerId != null
            ? {
                connect: { id: trailerId },
              }
            : undefined,
      },
    });
  }

  async findAll(
    page: number = 0,
    per_page: number = PER_PAGE
  ): Promise<{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: TruckModel[];
  }> {
    page = Math.max(page, 1) - 1; //@TODO: put this in middleware somehow
    const result = await this.prismaService.$transaction([
      this.prismaService.truck.count(),
      this.prismaService.truck.findMany({
        skip: page * per_page,
        take: per_page,
        include: {
          files: {
            include: { file_category: true },
            orderBy: {
              created: 'desc',
            },
          },
          drivers: true,
          trailer: true,
          location: true,
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

  async findByDateAvailable(date: string) {
    return await this.prismaService.truck.findMany({
      where: {
        // NOT: [{ drivers: undefined }],
        loads: {
          none: {
            // OR: [{ status: 'SAVED' }],
            AND: [
              {
                date_start: {
                  lte: parseISO(date),
                },
                date_end: {
                  gt: parseISO(date),
                },
              },
            ],
          },
        },
      },
      include: { loads: true, drivers: true, location: true, trailer: true },
    });
  }

  findByQuery(query: string, available: boolean) {
    if (available) {
      // return available trucks (Trailer can be null, there are loads which have no trailer)
      return this.prismaService.truck.findMany({
        take: 20,
        // where: { NOT: [{ trailer: null }] },
        include: { location: true },
      });
    }

    if (available === false) {
      return this.prismaService.truck.findMany({
        take: 20,
        where: { trailer: null },
        include: { location: true },
      });
    }

    const commonSettings = {
      include: { drivers: true, trailer: true, location: true },
    };
    if (!query) {
      return this.prismaService.truck.findMany({
        take: 10,
        ...commonSettings,
      });
    }
    return this.prismaService.truck.findMany({
      take: 10,
      where: {
        OR: [
          {
            year: Number(query) > 0 ? { in: Number(query) } : undefined,
          },
          { make: { contains: query, mode: 'insensitive' } },
          { model: { contains: query, mode: 'insensitive' } },
        ],
      },
      ...commonSettings,
    });
  }

  findOne(id: number) {
    return this.prismaService.truck.findUnique({
      where: { id: Number(id) },
      include: {
        drivers: true,
        location: true,
        files: {
          include: { file_category: true },
          orderBy: {
            created: 'desc',
          },
        },
        trailer: true,
        comments: {
          include: { user: true, driver: true, truck: true, trailer: true },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });
  }

  update(id, data) {
    const { drivers, trailerId, comments, ...rest } = data;
    if (rest.id) {
      rest.id = undefined;
    }

    return this.prismaService.truck.update({
      where: { id: Number(id) },
      data: {
        ...rest,
        drivers:
          drivers && drivers.length
            ? {
                connect: drivers.map((driverId) => ({ id: driverId })),
              }
            : undefined,
        trailerId: trailerId !== null ? trailerId : undefined,
        trailer: trailerId === null ? { disconnect: true } : undefined,
      },
    });
  }

  updateDisconnect(id, data) {
    const { drivers, trailerId } = data;

    return this.prismaService.truck.update({
      where: { id: Number(id) },
      data: {
        drivers:
          drivers && drivers.length
            ? {
                disconnect: drivers.map((driverId) => ({ id: driverId })),
              }
            : undefined,
        trailer:
          trailerId != null
            ? {
                connect: trailerId,
              }
            : { disconnect: true },
      },
    });
  }

  remove(id: number) {
    return this.prismaService.truck.delete({ where: { id: Number(id) } });
  }
}
