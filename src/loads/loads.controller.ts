import {
  Controller,
  Query,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { LoadsService } from './loads.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
@Controller('loads')
@UseGuards(JwtAuthenticationGuard)
export class LoadsController {
  constructor(private readonly loadsService: LoadsService) {}

  // @NOTE: Dispatch
  @Get('/dispatch')
  findAllDispatch() {
    return this.loadsService.findAllDispatch();
  }

  // @NOTE: Dispatch Crud
  @Post()
  create(@Body() createLoadDto: any) {
    return this.loadsService.create(createLoadDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('per_page') per_page = 5) {
    return this.loadsService.findAll(page, per_page);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateLoadDto: UpdateLoadDto
  ) {
    return this.loadsService.update(+id, updateLoadDto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadsService.remove(+id);
  }
}
