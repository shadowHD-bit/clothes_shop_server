import { Module } from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize'
import { ProductDatabaseModel } from '../product.model';
import { ProductParamsController } from './product-params.conroller';
import { ProductParamsDatabaseModel } from './product-params.model';
import { ProductParamsService } from './product-params.services';

@Module({
  controllers: [ProductParamsController],
  providers: [ProductParamsService],
  imports: [
    SequelizeModule.forFeature([ProductDatabaseModel, ProductParamsDatabaseModel])
  ],
  exports: [ProductParamsService]
})
export class ProductParamsModule {}
