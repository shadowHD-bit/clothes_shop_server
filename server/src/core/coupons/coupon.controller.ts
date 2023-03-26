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
import { CouponDatabaseModel } from './coupon.model';
import { CouponsService } from './coupon.service';
import { CouponDto } from './dto/coupon.dto';
  
  @ApiTags('Купоны')
  @Controller('api/coupons')
  export class CouponController {
    constructor(private couponsService: CouponsService) {}
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Создание купона' })
    @ApiResponse({ status: 200, type: CouponDatabaseModel })
    @Post('/create')
    createProduct(@Body() couponDto: CouponDto) {
      return this.couponsService.createCoupon(couponDto);
    }
  
    @ApiOperation({ summary: 'Получение купона' })
    @ApiResponse({ status: 200, type: CouponDatabaseModel })
    @Get('/get-one/:code')
    getOneProduct(@Param('code') code: string) {
      return this.couponsService.getOneCoupon(code);
    }
  
    @ApiOperation({ summary: 'Получение всех купонов' })
    @ApiResponse({ status: 200, type: CouponDatabaseModel })
    @Get('/get-all')
    getAllProduct() {
      return this.couponsService.getAllCoupon();
    }
  
    @ApiOperation({ summary: 'Удаление купона' })
    @ApiResponse({ status: 200, description: 'Купон удален!' })
    @Delete('/delete/:id')
    deleteProduct(@Param('id') id: number) {
      return this.couponsService.deleteCoupon(id);
    }
  }
  