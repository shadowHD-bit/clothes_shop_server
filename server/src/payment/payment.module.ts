import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PaymentsController } from './payment.controller';
import { PaymentService } from './payment.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentService],
  imports: [],
  exports: [PaymentService],
})
export class PaymentModule {}
