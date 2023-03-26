import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CouponController } from './coupon.controller';
import { CouponsService } from './coupon.service';
import { CouponDatabaseModel } from './coupon.model';

@Module({
  controllers: [CouponController],
  providers: [CouponsService],
  imports: [
    SequelizeModule.forFeature([
      CouponDatabaseModel,
    ]),
  ],
  exports: [CouponsService],
})
export class CouponsModule {}
