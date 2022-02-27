import { CreateTrailerDto } from './dto/create-trailer.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
const PER_PAGE = 5;

@Injectable()
export class TrailersService {
  commonSelectOptions = {
    files: {
      include: { file_category: true },
    },
    truck: {
      select: {
        unit_number: true,
        id: true,
        drivers: {
          select: { first_name: true, last_name: true, id: true },
        },
      },
    },
  };
  constructor(private readonly prismaService: PrismaService) {}

  create(createTruckDto: any) {
    // const { driver: driverId, ...rest } = createTruckDto;

    return this.prismaService.trailer.create({
      data: {
        ...createTruckDto,
        // driver:
        //   driverId != null
        //     ? {
        //         connect: {
        //           id: driverId,
        //         },
        //       }
        //     : undefined,
      },
    });
  }

  findByQuery(query: string, available: boolean) {
    // if (available) {
    // return available trucks

    return this.prismaService.trailer.findMany({
      take: 20,
      where: { truck: null },
    });
    // }
  }

  async findAll(
    page: number = 0,
    per_page: number = PER_PAGE
  ): Promise<{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
  }> {
    page = Math.max(page, 1) - 1; //@TODO: put this in middleware somehow
    const result = await this.prismaService.$transaction([
      this.prismaService.trailer.count(),
      this.prismaService.trailer.findMany({
        skip: page * per_page,
        take: per_page,
        include: {
          ...this.commonSelectOptions,
          comments: {
            include: { user: true },
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

  async findOne(id: number) {
    return this.prismaService.trailer.findUnique({
      where: { id: Number(id) },
      include: {
        ...this.commonSelectOptions,
        comments: {
          include: { user: true },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });
  }

  update(id: number, updateTrailerDto: UpdateTrailerDto) {
    return this.prismaService.trailer.update({
      where: { id: Number(id) },
      data: {
        ...updateTrailerDto,
      },
    });
  }

  remove(id: number) {
    return this.prismaService.trailer.delete({ where: { id: Number(id) } });
  }
}
