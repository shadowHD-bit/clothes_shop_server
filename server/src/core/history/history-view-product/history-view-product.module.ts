import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { User } from 'src/core/users/users.model';
import { HistoryViewProductController } from './history-view-product.controller';
import { HistoryViewProductsDataModel } from './history-view-product.model';
import { HistoryViewProductService } from './history-view-product.service';


@Module({
  controllers: [HistoryViewProductController],
  providers: [HistoryViewProductService],
  imports: [
    SequelizeModule.forFeature([HistoryViewProductsDataModel, User, ProductDatabaseModel]), forwardRef(() => AuthModule)
  ],
  exports: [HistoryViewProductService],
})
export class HistoryViewProductModule {}
