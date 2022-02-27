import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TrailersService } from './trailers.service';
import { CreateTrailerDto } from './dto/create-trailer.dto';
import { UpdateTrailerDto } from './dto/update-trailer.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('trailers')
@UseGuards(JwtAuthenticationGuard)
export class TrailersController {
  constructor(private readonly trailersService: TrailersService) {}

  @Post()
  create(@Body() createTrailerDto: any) {
    return this.trailersService.create(createTrailerDto);
  }

  @Get('/search')
  findByQuery(@Query('available') available: boolean) {
    return this.trailersService.findByQuery('', available);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('per_page') per_page = 5) {
    return this.trailersService.findAll(page, per_page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trailersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrailerDto: UpdateTrailerDto) {
    return this.trailersService.update(+id, updateTrailerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trailersService.remove(+id);
  }
}
