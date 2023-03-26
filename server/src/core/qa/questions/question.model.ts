import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  HasOne,
} from 'sequelize-typescript';
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { User } from 'src/core/users/users.model';
import { AnswersDatabaseModel } from '../answers/answer.model';

@Table({ tableName: 'questions' })
export class QuestionDatabaseModel extends Model<QuestionDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Как купить товар?', description: 'Тест вопроса' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  questionText: string;

  @ApiProperty({
    example: false,
    description: 'Флаг ответа на вопрос',
  })
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: false, defaultValue: false })
  isComplete: boolean;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel;

  @HasOne(() => AnswersDatabaseModel)
  answer: AnswersDatabaseModel
}