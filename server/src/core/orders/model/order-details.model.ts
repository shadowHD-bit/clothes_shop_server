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
import { ProductDatabaseModel } from 'src/core/products/product.model';
import { OrderDatabaseModel } from './order.model';

@Table({ tableName: 'order_details' })
export class OrderDetailsUserDatabaseModel extends Model<OrderDetailsUserDatabaseModel> {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор сущности заказ-товар',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Алексей', description: 'Имя покупателя' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  firstName: string;

  @ApiProperty({ example: 'Куриков', description: 'Фамилия покупателя' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  secondName: string;

  @ApiProperty({
    example: '89089566025',
    description: 'Номер телефона покупателя',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  numberPhone: string;

  @ApiProperty({ example: 'Россия', description: 'Страна доставки' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  country: string;

  @ApiProperty({ example: 'Томск', description: 'Город доставки' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  city: string;

  @ApiProperty({ example: 'Пушкина', description: 'Улица' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  street: string;

  @ApiProperty({ example: '15', description: 'Номер дома' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  numberHome: string;

  @ApiProperty({ example: '28', description: 'Номер квартиры' })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  numberApartment: string;

  @ApiProperty({ example: '625785', description: 'Почтовый индекс' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  zipCode: string;

  @ApiProperty({ example: 15, description: 'Размер скидки' })
  @Column({ type: DataType.FLOAT, unique: false, allowNull: true })
  sale: number;

  @ApiProperty({ example: true, description: 'Флаг платной доставки' })
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: false })
  paymentDelivery: boolean;

  @ApiProperty({ example: 14558, description: 'Общая стоимость' })
  @Column({ type: DataType.FLOAT, unique: false, allowNull: false })
  totalPrice: number;

  @ApiProperty({ example: '1', description: 'Идентификатор заказа' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => OrderDatabaseModel)
  orderId: number;

  @BelongsTo(() => OrderDatabaseModel)
  order: OrderDatabaseModel;
}
