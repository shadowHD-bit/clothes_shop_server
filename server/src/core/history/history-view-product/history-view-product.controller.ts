import {
    Body,
    Controller,
    Delete,
    Get,
    Header,
    Headers,
    Param,
    Post,
    Req,
    UseInterceptors,
  } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
  import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
  import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { AddHistoryViewProductDto } from './dto/history-view-product.dto';
import { HistoryViewProductsDataModel } from './history-view-product.model';
import { HistoryViewProductService } from './history-view-product.service';
  
  @ApiTags('История просмотра товаров')
  @Controller('api/history-view-product')
  export class HistoryViewProductController {
    constructor(private historyService: HistoryViewProductService) {}
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Добавить товар в историю' })
    @ApiResponse({ status: 200, type: HistoryViewProductsDataModel })
    @Post('/add')
    addProductInHistory(@Body() dto: AddHistoryViewProductDto) {
      return this.historyService.addProductInHistory(dto);
    }
  
    @ApiOperation({ summary: 'Получить историю товаров' })
    @ApiResponse({ status: 200, type: HistoryViewProductsDataModel })
    @Get('/get-all')
    getHistoryUser(@Req() req:any) {
      return this.historyService.getHistoryUser(req);
    }
  
  }
  