import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { ParamsProductDto } from './dto/create-params.dto';
import { ProductParamsDatabaseModel } from './product-params.model';
import { ProductParamsService } from './product-params.services';

@ApiTags('Параметры товара')
@Controller('api/products/params/')
export class ProductParamsController {
  constructor(private productParamsService: ProductParamsService) {}

  @ApiOperation({ summary: 'Создание параметра' })
  @ApiResponse({ status: 200, type: ProductParamsDatabaseModel })
  @Post('/create')
  create(@Body() productParamsDto: ParamsProductDto) {
    return this.productParamsService.createParam(productParamsDto);
  }

  @ApiOperation({ summary: 'Удаление параметра' })
  @ApiResponse({ status: 200, description: 'Параметр удален!' })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.productParamsService.deleteParam(id);
  }

  @ApiOperation({ summary: 'Получение параметра' })
  @ApiResponse({ status: 200, type: ProductParamsDatabaseModel })
  @Get('/get-one/:id')
  getOne(@Param('id') id: number) {
    return this.productParamsService.getParam(id);
  }

  @ApiOperation({ summary: 'Получение всех параметров' })
  @ApiResponse({ status: 200, type: ProductParamsDatabaseModel })
  @Get('/get-all')
  getAllProduct() {
    return this.productParamsService.getAllParams();
  }

  @ApiOperation({ summary: 'Получение всех параметров одного товара' })
  @ApiResponse({ status: 200, type: ProductParamsDatabaseModel })
  @Get('/get-all-product/:id')
  getAll(@Param('id') id: number) {
    return this.productParamsService.getAllParamsByProduct(id);
  }

  @ApiOperation({ summary: 'Обновление параметра' })
  @ApiResponse({ status: 200, description: 'Параметр обновлен!' })
  @Put('/update/:id')
  update(@Body() productParamsDto: ParamsProductDto, @Param('id') id: number) {
    return this.productParamsService.updateParam(id, productParamsDto);
  }
}
