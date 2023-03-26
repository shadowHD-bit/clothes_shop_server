import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductDatabaseModel } from '../products/product.model';
import { OrderDatabaseModel } from './model/order.model';
import { OrderProductUserDataModel } from './model/order-product.model';
import { BasketDataModel } from '../basket/models/basket.model';
import { BasketProductUserDataModel } from '../basket/models/basket-product.model';
import { SizeDatabaseModel } from '../sizes/models/size.model';
import { NotificationModule } from '../notification/notification.module';
import { OrderDetailsUserDatabaseModel } from './model/order-details.model';
import { JwtModule } from '@nestjs/jwt';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    SequelizeModule.forFeature([
      ProductDatabaseModel,
      SizeDatabaseModel,
      OrderDatabaseModel,
      OrderProductUserDataModel,
      BasketDataModel,
      BasketProductUserDataModel, OrderDetailsUserDatabaseModel, ProductSizeDatabaseModel
    ]),
    NotificationModule, JwtModule
  ],
  exports: [OrderService],
})
export class OrderModule {}
