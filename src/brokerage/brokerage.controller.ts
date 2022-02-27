import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  CacheInterceptor,
  UseGuards,
} from '@nestjs/common';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { BrokerageService } from './brokerage.service';
import { CreateBrokerageDto } from './dto/create-brokerage.dto';
import { UpdateBrokerageDto } from './dto/update-brokerage.dto';

@Controller('brokerage')
@UseGuards(JwtAuthenticationGuard)
// @UseInterceptors(CacheInterceptor) @TODO: Add interceptor but invalidate when new record added
export class BrokerageController {
  constructor(private readonly brokerageService: BrokerageService) {}

  @Post()
  create(@Body() createBrokerageDto: CreateBrokerageDto) {
    return this.brokerageService.create(createBrokerageDto);
  }

  @Get()
  findAll() {
    return this.brokerageService.findAll();
  }

  @Get('/search')
  findByQuery(@Query('query') query: string) {
    return this.brokerageService.findByQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brokerageService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBrokerageDto: UpdateBrokerageDto
  ) {
    return this.brokerageService.update(+id, updateBrokerageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brokerageService.remove(+id);
  }

  @Post('/agent')
  createRep(@Body() createBrokerageDto: CreateBrokerageDto) {
    return this.brokerageService.createRep(createBrokerageDto);
  }

  @Patch('agent/:id')
  updateRep(
    @Param('id') id: string,
    @Body() updateBrokerageDto: UpdateBrokerageDto
  ) {
    return this.brokerageService.updateRep(+id, updateBrokerageDto);
  }

  @Delete('agent/:id')
  removeRep(@Param('id') id: string) {
    return this.brokerageService.removeRep(+id);
  }
}
