import { CreateUserDto } from './create-user.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../database/prisma.service';
import { User as UserModel } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(post: CreateUserDto) {
    post['roles'] = ['dispatcher']; //@TODO: remove/upgrade eventually
    return this.prismaService.user.create({
      data: post,
    });
  }

  findAll(): Promise<UserModel[]> {
    return this.prismaService.user.findMany();
  }

  findAllDispatchers(): Promise<UserModel[]> {
    return this.prismaService.user.findMany({
      where: { roles: { has: 'dispatcher' } },
    });
  }

  async getById(id: number) {
    return this.prismaService.user.findUnique({ where: { id: Number(id) } });
  }

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  async remove(id: string) {
    return this.prismaService.driver.delete({ where: { id: Number(id) } });
  }
}
