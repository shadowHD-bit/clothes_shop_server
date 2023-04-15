import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SizeDatabaseModel } from './models/size.model';
import { ProductSizeDatabaseModel } from './models/size-product.model';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { ProductDatabaseModel } from '../products/product.model';

@Module({
  controllers: [SizeController],
  providers: [SizeService],
  imports: [
    SequelizeModule.forFeature([SizeDatabaseModel, ProductSizeDatabaseModel, ProductDatabaseModel]),
  ],
  exports: [SizeService],
})
export class SizeModule {}
