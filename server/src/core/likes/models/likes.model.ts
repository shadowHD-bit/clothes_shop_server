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
import { LikeProductUserDataModel } from './like-products.model';

@Table({ tableName: 'likes' })
export class LikeDatabaseModel extends Model<LikeDatabaseModel> {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор корзины понравившихся товаров',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => LikeProductUserDataModel)
  basket: LikeProductUserDataModel;
}
