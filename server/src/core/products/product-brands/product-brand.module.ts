import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { ProductBrandController } from './product brand.controller';
import { ProductBrandsService } from './product-brand.service';
import { ProductDatabaseModel } from '../product.model';
import { ProductBrandDatabaseModel } from './product-brand.model';

@Module({
  controllers: [ProductBrandController],
  providers: [ProductBrandsService],
  imports: [
    SequelizeModule.forFeature([
      ProductDatabaseModel,
      ProductBrandDatabaseModel,
    ]),
    FilesModule,
  ],
  exports: [ProductBrandsService],
})
export class ProductBrandsModule {}
