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
import { PaymentStatusDto } from './dto/payment-status.dto';
import { PaymentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';
  
  @ApiTags('Оплата')
  @Controller('api/payment')
  export class PaymentsController {
    constructor(private paymentService: PaymentService) {}
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Создание трафика оплаты' })
    @ApiResponse({ status: 200 })
    @Post('/create')
    async create(@Body() dto: PaymentDto) {
      return this.paymentService.create(dto);
    }
  
    @UseInterceptors(FileInterceptor('file'))
    @ApiOperation({ summary: 'Получение статуса оплаты' })
    @ApiResponse({ status: 200 })
    @Post('/get-status-payment')
    async getStatus(@Body() dto: PaymentStatusDto) {
      return this.paymentService.getPaymentStatus(dto);
    }

  }
  