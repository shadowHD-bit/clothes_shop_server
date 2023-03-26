import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AnswersDatabaseModel } from '../answers/answer.model';
import { User } from 'src/core/users/users.model';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { QuestionDatabaseModel } from '../questions/question.model';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { NotificationService } from 'src/core/notification/notification.service';
import { NotificationModule } from 'src/core/notification/notification.module';

@Module({
  controllers: [AnswerController],
  providers: [AnswerService],
  imports: [
    SequelizeModule.forFeature([QuestionDatabaseModel, AnswersDatabaseModel]),
    NotificationModule
  ],
  exports: [AnswerService],
})
export class AnswerModule {}
