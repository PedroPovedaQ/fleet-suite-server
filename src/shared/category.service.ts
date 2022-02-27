import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}
  findByType(type) {
    return this.prismaService.category.findMany({ where: { type } });
  }
}
