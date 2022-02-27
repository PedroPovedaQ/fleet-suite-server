import {
  Body,
  CacheInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TruckRoutingRequestDto } from './dto/truck-routing-request.dto';
import { MapsService } from './maps.service';

@Controller('routes')
@UseInterceptors(CacheInterceptor)
export class MapsController {
  constructor(private readonly mapsService: MapsService) {}

  @Get()
  findByType(@Query('query') query: string) {
    return this.mapsService.queryLocations(query);
  }

  @Post('/quick')
  getQuickTruckRoute(@Body() truckRoutingBody: TruckRoutingRequestDto) {
    return this.mapsService.getQuickRoute(truckRoutingBody);
  }
}
