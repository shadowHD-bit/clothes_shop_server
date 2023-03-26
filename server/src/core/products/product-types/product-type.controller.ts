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
import { ProductTypeDto } from './dto/product-type.dto';
import { ProductTypeDatabaseModel } from './product-type.model';
import { ProductTypesService } from './product-type.service';

  
  @ApiTags('Типы')
  @Controller('api/types')
  export class ProductTypeController {
    constructor(private productTypeService: ProductTypesService) {}
  
    @ApiOperation({ summary: 'Создание Типа' })
    @ApiResponse({ status: 200, type: ProductTypeDatabaseModel })
    @UseInterceptors(FileInterceptor('img'))
    @Post('/create')
    create(@Body() productTypeDto: ProductTypeDto, @UploadedFile() img) {
      return this.productTypeService.createType(productTypeDto, img);
    }
  
    @ApiOperation({ summary: 'Удаление типа' })
    @ApiResponse({ status: 200, description: 'Тип удален!' })
    @Delete('/delete/:id')
    delete(@Param('id') id: number) {
      return this.productTypeService.deleteType(id);
    }
  
    @ApiOperation({ summary: 'Получение типа' })
    @ApiResponse({ status: 200, type: ProductTypeDatabaseModel })
    @Get('/get-one/:id')
    getOne(@Param('id') id: number) {
      return this.productTypeService.getType(id);
    }
  
    @ApiOperation({ summary: 'Получение всех типов' })
    @ApiResponse({ status: 200, type: ProductTypeDatabaseModel })
    @Get('/get-all')
    getAll() {
      return this.productTypeService.getAllTypes();
    }
  
    @ApiOperation({ summary: 'Обновление типа' })
    @ApiResponse({ status: 200, description: "Тип обновлен!" })
    @UseInterceptors(FileInterceptor('img'))
    @Put('/update/:id')
    update(@Body() productTypeDto: ProductTypeDto, @UploadedFile() img:any, @Param("id") id:number) {
      return this.productTypeService.updateType(productTypeDto, img, id);
    }
  
  }
  