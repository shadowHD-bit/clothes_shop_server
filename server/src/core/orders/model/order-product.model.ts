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

@Table({ tableName: 'order_products' })
export class OrderProductUserDataModel extends Model<OrderProductUserDataModel> {
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

  @ApiProperty({ example: '11000', description: 'Цена' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  price: number;

  @ApiProperty({ example: '5', description: 'Количество товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  countproduct: number;

  @ApiProperty({ example: '45', description: 'Размер товара' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  sizeProduct: string;

  @ApiProperty({ example: '1', description: 'Идентификатор заказа' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => OrderDatabaseModel)
  orderId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel;

  @BelongsTo(() => OrderDatabaseModel)
  order: OrderDatabaseModel;
}
