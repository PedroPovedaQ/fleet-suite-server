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
import { DriversService } from './drivers.service';
import { UpdateDriverDto } from './dto/update-driver.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';
import { Roles } from '../authentication/roles.decorator';
import { Role } from '../authentication/role.enum';
import { RolesGuard } from '../authentication/roles.guard';

@Controller('drivers')
@UseGuards(JwtAuthenticationGuard, RolesGuard)
export class DriversController {
  constructor(private readonly driversService: DriversService) {}

  @Post()
  create(@Body() createDriverDto: any) {
    return this.driversService.create(createDriverDto);
  }

  @Get('/search')
  findByQuery(
    @Query('query') driver_name: string,
    @Query('available') available: boolean
  ) {
    return this.driversService.findByQuery(driver_name, available);
  }

  @Get()
  @Roles(Role.Dispatcher) //@TODO: revise this later
  findAll(@Query('page') page, @Query('per_page') per_page = 5) {
    return this.driversService.findAll(page, per_page); //@TODO: use query param
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.driversService.findOne(+id);
  }

  @Patch(':id/comment')
  addComment(@Param('id') id: string, @Body() comment: string) {
    return this.driversService.update(+id, comment);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driversService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driversService.remove(+id);
  }
}
