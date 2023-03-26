import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/core/users/users.model';
import { QuestionDatabaseModel } from '../questions/question.model';

@Table({ tableName: 'answers' })
export class AnswersDatabaseModel extends Model<AnswersDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Изнать подробную информацию можно на сайте', description: 'Тест ответа' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  answerText: string;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор вопроса' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => QuestionDatabaseModel)
  questionId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => QuestionDatabaseModel)
  question: QuestionDatabaseModel;
}
