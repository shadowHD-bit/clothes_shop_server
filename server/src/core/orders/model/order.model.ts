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
import { User } from 'src/core/users/users.model';
import { OrderDetailsUserDatabaseModel } from './order-details.model';
import { OrderProductUserDataModel } from './order-product.model';

@Table({ tableName: 'orders' })
export class OrderDatabaseModel extends Model<OrderDatabaseModel> {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор заказа',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: true,
    description: 'Флаг доставки товара',
  })
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
  })
  isComplete: boolean;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => OrderProductUserDataModel)
  order_products: OrderProductUserDataModel;

  @HasOne(() => OrderDetailsUserDatabaseModel)
  order_details: OrderDetailsUserDatabaseModel;
}
