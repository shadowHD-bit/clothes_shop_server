import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import {
  Model,
  Table,
  Column,
  DataType,
  HasOne,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductDatabaseModel } from '../product.model';

@Table({ tableName: 'product_params' })
export class ProductParamsDatabaseModel extends Model<ProductParamsDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Страна производства',
    description: 'Наименнование параметра товара',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  title: string;

  @ApiProperty({
    example: 'Германия',
    description: 'Описание параметра товара',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  description: string;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @ForeignKey(() => ProductDatabaseModel)
  @Column({
    type: DataType.INTEGER,
    unique: false,
    allowNull: false,
  })
  productId: number;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel;
}
