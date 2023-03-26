import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { ProductDatabaseModel } from '../product.model';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeDatabaseModel } from './product-type.model';
import { ProductTypesService } from './product-type.service';


@Module({
  controllers: [ProductTypeController],
  providers: [ProductTypesService],
  imports: [
    SequelizeModule.forFeature([
      ProductDatabaseModel,
      ProductTypeDatabaseModel,
    ]),
    FilesModule,
  ],
  exports: [ProductTypesService],
})
export class ProductTypesModule {}
