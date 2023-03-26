import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { BasketDataModel } from '../basket/models/basket.model';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { OrderProductUserDataModel } from '../orders/model/order-product.model';
import { SocialUserDataModel } from '../../auth/social-auth/vk-auth/vk-auth.model';
import { SocialGoogleUserDataModel } from '../../auth/social-auth/google-auth/google-auth.model';
import { ResetPasswordDatabaseModel } from '../../auth/reset-psw/reset-psw.model';
import { AuthModule } from '../../auth/auth.module';
import { FilesModule } from '../../files/files.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([User, OrderDatabaseModel]),
    FilesModule,
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  exports: [UsersService],
})
export class UsersModule {}
