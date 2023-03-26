import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { QuestionDatabaseModel } from './question.model';
import { AnswersDatabaseModel } from '../answers/answer.model';
import { User } from 'src/core/users/users.model';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { ProductDatabaseModel } from 'src/core/products/product.model';

@Module({
  controllers: [QuestionController],
  providers: [QuestionService],
  imports: [
    SequelizeModule.forFeature([
      QuestionDatabaseModel,
      AnswersDatabaseModel,
      ProductDatabaseModel,
      User,
    ]),
  ],
  exports: [QuestionService],
})
export class QuestionModule {}
