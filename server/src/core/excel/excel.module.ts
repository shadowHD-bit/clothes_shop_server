import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { ProductBrandDatabaseModel } from '../products/product-brands/product-brand.model';
import { ProductTypeDatabaseModel } from '../products/product-types/product-type.model';
import { ProductDatabaseModel } from '../products/product.model';
import { User } from '../users/users.model';
import { ExcelController } from './excel.controller';
import { ExcelService } from './excel.service';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';
import { SizeDatabaseModel } from '../sizes/models/size.model';

@Module({
  controllers: [ExcelController],
  providers: [ExcelService],
  imports: [SequelizeModule.forFeature([ProductSizeDatabaseModel, SizeDatabaseModel, ProductDatabaseModel, ProductTypeDatabaseModel, ProductBrandDatabaseModel, OrderProductUserDataModel, User, OrderDatabaseModel]),],
  exports: [ExcelService],
})
export class ExcelModule {}
