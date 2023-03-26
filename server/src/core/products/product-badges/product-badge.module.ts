import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductBadgeController } from './product-badge.controller';
import { ProductBadgeService } from './product-badge.service';
import { ProductBadgeDatabaseModel } from './product-badge.model';
import { ProductDatabaseModel } from '../product.model';

@Module({
  controllers: [ProductBadgeController],
  providers: [ProductBadgeService],
  imports: [
    SequelizeModule.forFeature([
      ProductDatabaseModel,
      ProductBadgeDatabaseModel,
    ]),
  ],
  exports: [ProductBadgeService],
})
export class ProductBadgeModule {}
