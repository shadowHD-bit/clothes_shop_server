import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductDatabaseModel } from '../products/product.model';
import { LikeController } from './likes.controller';
import { LikeService } from './likes.service';
import { LikeProductUserDataModel } from './models/like-products.model';
import { LikeDatabaseModel } from './models/likes.model';

@Module({
  controllers: [LikeController],
  providers: [LikeService],
  imports: [
    SequelizeModule.forFeature([LikeDatabaseModel, LikeProductUserDataModel, ProductDatabaseModel]), forwardRef(() => AuthModule)
  ],
  exports: [LikeService],
})
export class LikeModule {}
