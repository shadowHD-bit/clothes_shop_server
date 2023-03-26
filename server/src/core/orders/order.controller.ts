import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Request,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse } from '@nestjs/swagger/dist';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { OrderDetailDto } from './dto/order-details.dto';
import { GetOrderCompleteDto } from './dto/order-get-complete.dto';
import { OrderDatabaseModel } from './model/order.model';
import { OrderService } from './order.service';

@ApiTags('Заказы')
@Controller('api/orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Создание заказа' })
  @ApiResponse({ status: 200, type: OrderDatabaseModel })
  @Post('/create')
  create(@Body() dto: OrderDetailDto, @Req() req: any) {
    return this.orderService.createOrder(dto, req);
  }

  @ApiOperation({ summary: 'Обновление статуса заказа' })
  @ApiResponse({ status: 200, description: 'Статус изменен!' })
  @Put('/update-status/:id')
  updateStatus(@Body() dto: GetOrderCompleteDto, @Param('id') id: number) {
    return this.orderService.updateStatusOrder(id, dto);
  }

  @ApiOperation({ summary: 'Удаление заказа' })
  @ApiResponse({ status: 200, description: 'Заказ удален' })
  @Delete('/delete/:id')
  delete(@Param('id') id: number) {
    return this.orderService.deleteOrder(id);
  }

  @ApiOperation({ summary: 'Получение всех заказов' })
  @ApiResponse({ status: 200, type: OrderDatabaseModel })
  @Get('/get-all?')
  getAllOrders(
  @Query('limit') limit: number,
  @Query('page') page: number,
  @Query('complete') complete: string,) {
    return this.orderService.getAllOrder(limit, page, complete);
  }

  @ApiOperation({ summary: 'Получение одного заказа' })
  @ApiResponse({ status: 200, type: OrderDatabaseModel })
  @Get('/get-one/:id')
  getOneOrders(@Param('id') id: number) {
    return this.orderService.getOneOrder(id);
  }

  @ApiOperation({ summary: 'Получение заказов одного пользователя' })
  @ApiResponse({ status: 200, type: OrderDatabaseModel })
  @Get('/get-one-user?')
  getOneUser(
    @Query('userId') userId: number,
    @Query('limit') limit: number,
    @Query('page') page: number,
    @Query('complete') complete: string,
  ) {
    return this.orderService.getOneUserOrders(userId, limit, page, complete);
  }
}
