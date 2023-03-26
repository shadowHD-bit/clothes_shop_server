import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateProductDto } from '../products/dto/product-create.dto';
import { CreateSizeProductDto } from './dto/size-product.dto';
import { CreateSizeDto } from './dto/size.dto';
import { ProductSizeDatabaseModel } from './models/size-product.model';
import { SizeDatabaseModel } from './models/size.model';
import { SizeService } from './size.service';

@ApiTags('Размеры')
@Controller('api/sizes')
export class SizeController {
  constructor(private sizeService: SizeService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Создание размера' })
  @ApiResponse({ status: 200, type: SizeDatabaseModel })
  @Post('/create')
  create(@Body() dto: CreateSizeDto) {
    return this.sizeService.createSize(dto);
  }

  @ApiOperation({ summary: 'Получение всех размеров' })
  @ApiResponse({ status: 200, type: SizeDatabaseModel })
  @Get('/get-all')
  getAll() {
    return this.sizeService.getSizes();
  }

  @ApiOperation({ summary: 'Получение всех размеров одного товара' })
  @ApiResponse({ status: 200, type: SizeDatabaseModel })
  @Get('/product/get-all/:productId')
  getAllProduct(@Param('productId') productId: number) {
    return this.sizeService.getSizesOneProduct(productId);
  }

  @ApiOperation({ summary: 'Удаление размера' })
  @ApiResponse({ status: 200, description: 'Размер удален' })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.sizeService.deleteSize(id);
  }
  
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Изменение количества товара по данному размеру' })
  @ApiResponse({ status: 200, type: ProductSizeDatabaseModel  })
  @Put('/update/count')
  update(@Body() dto: CreateSizeProductDto) {
    return this.sizeService.updateCountSizeProduct(dto);
  }

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Добавление размера товару' })
  @ApiResponse({ status: 200, type: ProductSizeDatabaseModel })
  @Post('/product/create')
  createProductSize(@Body() dto: CreateSizeProductDto) {
    return this.sizeService.createSizeProduct(dto);
  }
  
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Удаление размера товару' })
  @ApiResponse({ status: 200, description: 'Размер товара удален' })
  @Delete('/product/delete')
  deleteProductSize(@Body() dto: CreateSizeProductDto) {
    return this.sizeService.deleteSizeProduct(dto);
  }
}
