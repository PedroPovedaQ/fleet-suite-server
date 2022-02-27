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
  Query,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Stream } from 'node:stream';
import { Response } from 'express';
import JwtAuthenticationGuard from '../authentication/jwt-authentication.guard';

@Controller('categories')
@UseGuards(JwtAuthenticationGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findByType(@Query('type') type: string) {
    return this.categoryService.findByType(type);
  }
}
