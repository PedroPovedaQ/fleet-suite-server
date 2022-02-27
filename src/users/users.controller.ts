import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export default class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(@Query('dispatcher') dispatcher: string) {
    return dispatcher
      ? this.usersService.findAllDispatchers()
      : this.usersService.findAll();
  }

  @Post()
  async createUser(@Body() user: CreateUserDto) {
    return this.usersService.create(user);
  }
}
