import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReviewDatabaseModel } from './review.model';
import { ProductDatabaseModel } from '../products/product.model';
import { User } from '../users/users.model';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [
    SequelizeModule.forFeature([
      User,
      ReviewDatabaseModel,
      ProductDatabaseModel,
    ]), FilesModule
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
