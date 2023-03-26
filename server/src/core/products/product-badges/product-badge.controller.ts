import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { ProductBadgeDatabaseModel } from './product-badge.model';
import { ProductBadgeService } from './product-badge.service';

@ApiTags('Баджи товара')
@Controller('api/product-badge')
export class ProductBadgeController {
  constructor(private productBadgeService: ProductBadgeService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Создание баджа товара' })
  @ApiResponse({ status: 200, type: ProductBadgeDatabaseModel })
  @Post('/create')
  createProduct(@Body() productBadgeDto: CreateBadgeDto) {
    return this.productBadgeService.createBadge(productBadgeDto);
  }

  @ApiOperation({ summary: 'Получение баджа товара' })
  @ApiResponse({ status: 200, type: ProductBadgeDatabaseModel })
  @Get('/get-one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.productBadgeService.getBadge(id);
  }

  @ApiOperation({ summary: 'Получение всех баджей товаров' })
  @ApiResponse({ status: 200, type: ProductBadgeDatabaseModel })
  @Get('/get-all')
  getAllProduct() {
    return this.productBadgeService.getAllBadges();
  }

  @ApiOperation({ summary: 'Удаление баджа товара' })
  @ApiResponse({ status: 200, description: 'Бадж удален!' })
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productBadgeService.deleteBadge(id);
  }
}
