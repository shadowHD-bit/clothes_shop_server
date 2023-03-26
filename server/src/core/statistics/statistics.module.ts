import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { ProductBrandDatabaseModel } from '../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../products/product.model';
import { User } from '../users/users.model';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';


@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService],
  imports: [
    SequelizeModule.forFeature([
      User, ProductDatabaseModel, OrderDatabaseModel, ProductTypeDatabaseModel, ProductBrandDatabaseModel, OrderProductUserDataModel
    ]),
  ],
  exports: [StatisticsService],
})
export class StatisticsModule {}
