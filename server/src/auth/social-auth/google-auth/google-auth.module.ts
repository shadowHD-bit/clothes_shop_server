import { ProductDatabaseModel } from './../../../core/products/product.model';
import { BasketProductUserDataModel } from './../../../core/basket/models/basket-product.model';
import { LikeProductUserDataModel } from './../../../core/likes/models/like-products.model';
import { BasketDataModel } from './../../../core/basket/models/basket.model';
import { LikeDatabaseModel } from './../../../core/likes/models/likes.model';
import { OrderDatabaseModel } from './../../../core/orders/model/order.model';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BasketModule } from '../../../core/basket/basket.module';
import { LikeModule } from '../../../core/likes/likes.module';
import { User } from '../../../core/users/users.model';
import { UsersModule } from '../../../core/users/users.module';
import { AuthModule } from '../../auth.module';
import { SocialUserDataModel } from '../vk-auth/vk-auth.model';
import { GoogleAuthController } from './google-auth.controller';
import { SocialGoogleUserDataModel } from './google-auth.model';
import { GoogleAuthService } from './google-auth.service';

@Module({
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService],
  imports: [
    SequelizeModule.forFeature([
      User,
      SocialGoogleUserDataModel,
      SocialUserDataModel,
      OrderDatabaseModel,
      LikeDatabaseModel,
      BasketDataModel,
      LikeProductUserDataModel,
      BasketProductUserDataModel,
      ProductDatabaseModel,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => UsersModule),
    forwardRef(() => LikeModule),
    forwardRef(() => BasketModule),
  ],
  exports: [GoogleAuthService],
})
export class GoogleAuthModule {}
