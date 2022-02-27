import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prismaService: PrismaService) {}

  create(comment) {
    const {
      driverId = undefined,
      truckId = undefined,
      trailerId = undefined,
      loadId = undefined,
      brokerId = undefined,
      userId,
      text,
    } = comment;
    return this.prismaService.comment.create({
      data: {
        text,
        driver:
          driverId != undefined
            ? {
                connect: { id: comment.driverId },
              }
            : undefined,
        truck:
          truckId != undefined
            ? {
                connect: { id: comment.truckId },
              }
            : undefined,
        trailer:
          trailerId != undefined
            ? {
                connect: { id: trailerId },
              }
            : undefined,
        load:
          loadId != undefined
            ? {
                connect: { id: loadId },
              }
            : undefined,
        brokerage:
          brokerId != undefined
            ? {
                connect: { id: brokerId },
              }
            : undefined,
        user: {
          connect: { id: comment.userId },
        },
      },
    });
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: any) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
