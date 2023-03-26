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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateBrandDto } from './dto/create-product-brand.dto';
import { UpdateBrandDto } from './dto/update-product-brand.dto';
import { ProductBrandDatabaseModel } from './product-brand.model';
import { ProductBrandsService } from './product-brand.service';

@ApiTags('Бренды')
@Controller('api/brands')
export class ProductBrandController {
  constructor(private productBrandService: ProductBrandsService) {}

  @ApiOperation({ summary: 'Создание бренда' })
  @ApiResponse({ status: 200, type: ProductBrandDatabaseModel })
  @UseInterceptors(FileInterceptor('img'))
  @Post('/create')
  create(@Body() productBrandDto: CreateBrandDto, @UploadedFile() img) {
    return this.productBrandService.createBrand(productBrandDto, img);
  }

  @ApiOperation({ summary: 'Удаление бренда' })
  @ApiResponse({ status: 200, description: 'Бренд удален!' })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.productBrandService.deleteBrand(id);
  }

  @ApiOperation({ summary: 'Получение бренда' })
  @ApiResponse({ status: 200, type: ProductBrandDatabaseModel })
  @Get('/get-one/:id')
  getOne(@Param('id') id: number) {
    return this.productBrandService.getBrand(id);
  }

  @ApiOperation({ summary: 'Получение всех брендов' })
  @ApiResponse({ status: 200, type: ProductBrandDatabaseModel })
  @Get('/get-all')
  getAll() {
    return this.productBrandService.getAllBrands();
  }

  @ApiOperation({ summary: 'Обновление бренда' })
  @ApiResponse({ status: 200, description: "Бренд обновлен!" })
  @UseInterceptors(FileInterceptor('img'))
  @Put('/update/:id')
  update(@Body() productBrandDto: UpdateBrandDto, @UploadedFile() img, @Param("id") id:number) {
    return this.productBrandService.updateBrand(productBrandDto, img, id);
  }

}
