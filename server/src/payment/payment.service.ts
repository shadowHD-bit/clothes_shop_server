import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  YooCheckout,
  ICreatePayment,
  ICapturePayment,
} from '@a2seven/yoo-checkout';
import { PaymentDto } from './dto/payment.dto';
import * as uuid from 'uuid';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Injectable()
export class PaymentService {
  constructor() {}

  async create(dto: PaymentDto) {
    const checkout = new YooCheckout({
        shopId: process.env.SHOP_ID,
        secretKey: process.env.PAYMENT_TOKEN,
      });
    const idempotenceKey = uuid.v4();
    const amountPrice = dto.amount.toFixed(2);
    const createPayload: ICreatePayment = {
      amount: {
        value: amountPrice,
        currency: 'RUB',
      },
      payment_method_data: {
        type: 'bank_card',
      },
      confirmation: {
        type: 'redirect',
        return_url: 'http://localhost:3000/thanks',
      },
    };

    try {
      const payment = await checkout.createPayment(
        createPayload,
        idempotenceKey,
      );
      return payment;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getPaymentStatus(dto: PaymentStatusDto) {
    const checkout = new YooCheckout({
        shopId: process.env.SHOP_ID,
        secretKey: process.env.PAYMENT_TOKEN,
      });
    const capturePayload: ICapturePayment = {
        amount: {
            value: dto.object.amount.value,
            currency: dto.object.amount.currency
        }
    };
    
    try {
        const payment = await checkout.capturePayment(dto.object.id.toString(), capturePayload);
        return payment
    } catch (error) {
         console.error(error);
    }
  }
}
