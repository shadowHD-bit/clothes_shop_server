import { User } from './../core/users/users.model';
import { SocialUserDataModel } from 'src/auth/social-auth/vk-auth/vk-auth.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../core/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BasketDataModel } from '../core/basket/models/basket.model';
import { LikeDatabaseModel } from '../core/likes/models/likes.model';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    SequelizeModule.forFeature([
      User, BasketDataModel, LikeDatabaseModel
    ]),
    JwtModule.register({
      secret: process.env.PRIVATE_KEY || 'SECRET_KEY',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}
