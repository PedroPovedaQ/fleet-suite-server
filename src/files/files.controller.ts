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
  Res,
  UseGuards,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('attachments')
@UseGuards(JwtAuthenticationGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get(':id')
  async getAttachment(@Param('id') id: number) {
    return this.filesService.getAttachment(id);
  }

  @Delete(':id')
  async deleteAttachment(@Param('id') id: number) {
    //@TODO: Add
    return this.filesService.deleteAttachment(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  attach(@UploadedFile() file: any, @Body() body: CreateFileDto) {
    return this.filesService.attach(
      file.buffer,
      body.name,
      body.type,
      body.id,
      body.category,
      body.expiration ? new Date(body.expiration) : undefined
    );
  }
}
