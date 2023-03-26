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
import { User } from 'src/core/users/users.model';
import { BasketDataModel } from './basket.model';

@Table({ tableName: 'products_basket' })
export class BasketProductUserDataModel extends Model<BasketProductUserDataModel> {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор сущности корзина-товар',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор корзины пользователя',
  })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => BasketDataModel)
  basketId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор размера' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  //@ForeignKey(() => User)
  sizeId: number;

  @ApiProperty({ example: '1', description: 'Количество товара' })
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
    defaultValue: 1,
  })
  count: number;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel;

  @BelongsTo(() => BasketDataModel)
  basket: BasketDataModel;

  // @BelongsTo(() => User)
  // user: User
}
