import { forwardRef, Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import { AuthModule } from 'src/auth/auth.module';
import { ProductsController } from './product.controller';
import { ProductsService } from './product.service';
import { ProductDatabaseModel } from './product.model';
import { FilesModule } from 'src/files/files.module';
import { ProductParamsDatabaseModel } from './product-params/product-params.model';
import { ProductTypeDatabaseModel } from './product-types/product-type.model';
import { ProductBadgeDatabaseModel } from './product-badges/product-badge.model';
import { ProductBrandDatabaseModel } from './product-brands/product-brand.model';
import { SizeDatabaseModel } from '../sizes/models/size.model';
import { SizeModule } from '../sizes/size.module';
import { ProductParamsModule } from './product-params/product-params.module';
import { ReviewDatabaseModel } from '../reviews/review.model';
import { ProductSizeDatabaseModel } from '../sizes/models/size-product.model';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [
    SequelizeModule.forFeature([ProductSizeDatabaseModel, ProductDatabaseModel, ProductParamsDatabaseModel, ProductTypeDatabaseModel, ProductBadgeDatabaseModel, ProductBrandDatabaseModel, ReviewDatabaseModel]), ProductParamsModule, FilesModule, SizeModule
  ],
  exports: [ProductsService]
})
export class ProductsModule {}
