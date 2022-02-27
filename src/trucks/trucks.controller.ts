import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Req,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { Stream } from 'node:stream';
import { Response } from 'express';
import { TrucksService } from './trucks.service';
import { CreateTruckDto } from './dto/create-truck.dto';
import { UpdateTruckDto } from './dto/update-truck.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('trucks')
@UseGuards(JwtAuthenticationGuard)
export class TrucksController {
  constructor(private readonly trucksService: TrucksService) {}

  @Post()
  create(@Body() createTruckDto: any) {
    return this.trucksService.create(createTruckDto);
  }

  @Get('/search')
  findByQuery(
    @Query('query') query: string,
    @Query('available') available: boolean
  ) {
    return this.trucksService.findByQuery(query, available);
  }

  @Get('/available')
  findByDate(@Query('date') date: string) {
    return this.trucksService.findByDateAvailable(date);
  }

  @Get()
  findAll(@Query('page') page, @Query('per_page') per_page = 5) {
    return this.trucksService.findAll(page, per_page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trucksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTruckDto: any) {
    return this.trucksService.update(+id, updateTruckDto);
  }

  @Patch(':id/remove')
  updateDisconnect(@Param('id') id: string, @Body() updateTruckDto: any) {
    return this.trucksService.updateDisconnect(+id, updateTruckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trucksService.remove(+id);
  }
}
