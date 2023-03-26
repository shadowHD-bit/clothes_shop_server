import { UsersModule } from './../../../core/users/users.module';
import { LikeModule } from './../../../core/likes/likes.module';
import { BasketModule } from './../../../core/basket/basket.module';
import { AuthModule } from './../../auth.module';
import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../../../core/users/users.model';
import { VkAuthController } from './vk-auth.controller';
import { SocialUserDataModel } from './vk-auth.model';
import { VkAuthService } from './vk-auth.service';
import { SocialGoogleUserDataModel } from '../google-auth/google-auth.model';

@Module({
  controllers: [VkAuthController],
  providers: [VkAuthService],
  imports: [
    SequelizeModule.forFeature([User, SocialUserDataModel, SocialGoogleUserDataModel]), forwardRef(() => AuthModule), forwardRef(() => UsersModule), forwardRef(() => LikeModule), forwardRef(() => BasketModule),
  ],
  exports: [VkAuthService]
})
export class VkAuthModule {}
