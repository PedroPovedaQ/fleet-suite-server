import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBrokerageDto } from './dto/create-brokerage.dto';
import { UpdateBrokerageDto } from './dto/update-brokerage.dto';

@Injectable()
export class BrokerageService {
  constructor(private readonly prisma: PrismaService) {}

  create(createBrokerageDto: CreateBrokerageDto) {
    return this.prisma.brokerage.create({ data: createBrokerageDto as any });
  }

  async findAll(
    page: number = 0,
    per_page: number = 5
  ): Promise<{
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: any[];
  }> {
    page = Math.max(page, 1) - 1; //@TODO: put this in middleware somehow
    const result = await this.prisma.$transaction([
      this.prisma.brokerage.count(),
      this.prisma.brokerage.findMany({
        skip: page * per_page,
        take: 20, //@TODO: fix
        include: {
          agents: true,
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

  findByQuery(mc_number_name_partial: string) {
    if (!mc_number_name_partial) {
      return this.prisma.brokerage.findMany({
        take: 10,
      });
    }
    return this.prisma.brokerage.findMany({
      take: 10,
      where: {
        OR: [
          {
            mc_number: {
              search: mc_number_name_partial,
            },
          },
          { name: { search: mc_number_name_partial } },
        ],
      },
      include: { agents: true },
    });
  }

  findOne(id: number) {
    return this.prisma.brokerage.findUnique({
      where: { id: Number(id) },
      include: {
        agents: true,
        comments: {
          include: { user: true },
          orderBy: {
            created: 'desc',
          },
        },
      },
    });
  }

  update(id, data) {
    const { comments, ...rest } = data;
    if (rest.id) {
      rest.id = undefined;
    }

    return this.prisma.brokerage.update({
      where: { id: Number(id) },
      data: {
        ...rest,
      },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} brokerage`;
  }

  upsert(mc_number: string) {
    return this.prisma.brokerage.upsert({
      where: {
        mc_number,
      },
      update: {},
      create: {
        mc_number,
      },
    });
  }

  // BROKERAGE REPS

  createRep(createBrokerageDto: CreateBrokerageDto) {
    return this.prisma.brokerageRep.create({ data: createBrokerageDto as any });
  }

  updateRep(id, data) {
    const { brokerId, ...rest } = data;
    return this.prisma.brokerageRep.update({
      where: { id: Number(id) },
      data: {
        ...rest,
      },
    });
  }

  removeRep(id) {
    return this.prisma.brokerageRep.delete({
      where: { id: Number(id) },
    });
  }
}
