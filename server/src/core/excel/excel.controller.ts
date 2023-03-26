import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
  import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { ProductBrandDatabaseModel } from '../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../products/product.model';
import { User } from '../users/users.model';
import { ExcelService } from './excel.service';


  @ApiTags('Документы Excel')
  @Controller('api/document/excel')
  export class ExcelController {
    constructor(private excelService: ExcelService) {}
  
    @ApiOperation({ summary: 'Получение пользователей в формате .xlsx' })
    @ApiResponse({ status: 200, type: User })
    @Get('/get-user')
    getProduct() {
      return this.excelService.getUsersToExcel();
    }

    @ApiOperation({ summary: 'Получение типов продукта в формате .xlsx' })
    @ApiResponse({ status: 200, type: ProductTypeDatabaseModel })
    @Get('/get-types')
    getTypes() {
      return this.excelService.getTypeToExcel();
    }
  
    @ApiOperation({ summary: 'Получение брендов продукта в формате .xlsx' })
    @ApiResponse({ status: 200, type: ProductBrandDatabaseModel })
    @Get('/get-brands')
    getBrands() {
      return this.excelService.getBrandToExcel();
    }

    @ApiOperation({ summary: 'Получение продуктов в формате .xlsx' })
    @ApiResponse({ status: 200, type: ProductDatabaseModel })
    @Get('/get-products')
    getProducts() {
      return this.excelService.getProductToExcel();
    }

    @ApiOperation({ summary: 'Получение заказов в формате .xlsx' })
    @ApiResponse({ status: 200, type: OrderDatabaseModel })
    @Get('/get-orders?')
    getOrders(@Query('complete') complete:string) {
      return this.excelService.getOrderToExcel(complete);
    }
  }
  