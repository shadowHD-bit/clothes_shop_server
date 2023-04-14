import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateProductDto } from './dto/product-create.dto';
import { GetProductDto } from './dto/product-get.dto';
import { SearchProductDto } from './dto/product-search.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { UpdateDisplayProductDto } from './dto/update-display.dto';
import { ProductDatabaseModel } from './product.model';
import { ProductsService } from './product.service';

@ApiTags('Товары')
@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imgMain', maxCount: 1 },
      { name: 'imgAdditionallyFirst', maxCount: 1 },
      { name: 'imgAdditionallySecond', maxCount: 1 },
      { name: 'imgAdditionallyThird', maxCount: 1 },
    ]),
  )
  @Post('/create')
  createProduct(
    @Body() productDto: CreateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.createProduct(productDto, files);
  }

  @ApiOperation({ summary: 'Создание нескольких товаров' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @UseInterceptors()
  @Post('/create/more-product')
  createMoreProducts(@Body() products: Array<object>) {
    return this.productService.createMoreProducts(products);
  }

  @ApiOperation({ summary: 'Обновление товара' })
  @ApiResponse({ status: 200, description: 'Товар обновлен!' })
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'imgMain', maxCount: 1 },
      { name: 'imgAdditionallyFirst', maxCount: 1 },
      { name: 'imgAdditionallySecond', maxCount: 1 },
      { name: 'imgAdditionallyThird', maxCount: 1 },
    ]),
  )
  @Put('/update/:id')
  update(
    @Param('id') id: number,
    @Body() productDto: UpdateProductDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.productService.updateProduct(id, productDto, files);
  }

  @ApiOperation({ summary: 'Обновление отображения товара' })
  @ApiResponse({ status: 200, description: 'Товар обновлен!' })
  @Put('/update-display')
  updateDisplayProduct(@Body() productDto: UpdateDisplayProductDto) {
    return this.productService.updateDisplayProduct(productDto);
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({ status: 200, description: 'Товар удален!' })
  @Delete('/delete/:id')
  deleteProduct(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @ApiOperation({ summary: 'Получение одного товара' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/get-one/:id')
  getOneProduct(@Param('id') id: number) {
    return this.productService.getProduct(id);
  }

  @ApiOperation({ summary: 'Получение всех товаров' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/get-all')
  getAllProduct(@Query('productTypeId') productTypeId: number, @Query('productBrandId') productBrandId: number,) {
    return this.productService.getAllProducts(productTypeId, productBrandId);
  }

  @ApiOperation({ summary: 'Получение товаров в поиске по имени' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/search-by-name/:name')
  searchByName(@Param('name') name: string) {
    return this.productService.searchAllProductByName(name);
  }

  @ApiOperation({ summary: 'Получение товаров для админки' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/for-admin/get-all')
  getProductForAdmin() {
    return this.productService.getProductForAdmin();
  }

  @ApiOperation({ summary: 'Получение популярных товаров (4 шт)' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/get-popular')
  getPopularProduct() {
    return this.productService.getPopularProduct();
  }

  @ApiOperation({ summary: 'Получение последних товаров (4 шт)' })
  @ApiResponse({ status: 200, type: ProductDatabaseModel })
  @Get('/get-last')
  getLastProduct() {
    return this.productService.getLastProduct();
  }
}
