import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { User } from '../../users/users.model';
import { BasketProductUserDataModel } from './basket-product.model';

@Table({ tableName: 'baskets' })
export class BasketDataModel extends Model<BasketDataModel> {
  @ApiProperty({example: '1', description: 'Идентификатор корзины'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User

  @HasMany(() => BasketProductUserDataModel)
  basket: BasketProductUserDataModel
}