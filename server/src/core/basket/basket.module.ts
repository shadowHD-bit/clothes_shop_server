import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductDatabaseModel } from '../products/product.model';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import { BasketProductUserDataModel } from './models/basket-product.model';
import { BasketDataModel } from './models/basket.model';

@Module({
  controllers: [BasketController],
  providers: [BasketService],
  imports: [
    SequelizeModule.forFeature([
      BasketProductUserDataModel,
      BasketDataModel,
      ProductDatabaseModel,
    ]),
    forwardRef(() => AuthModule),
  ],
  exports: [BasketService],
})
export class BasketModule {}
