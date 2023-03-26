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
import { SizeDatabaseModel } from './size.model';

@Table({ tableName: 'product_sizes' })
export class ProductSizeDatabaseModel extends Model<ProductSizeDatabaseModel> {
  @ApiProperty({
    example: '1',
    description: 'Идентификатор',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '5', description: 'Идентификатор размера' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => SizeDatabaseModel)
  sizeId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  count: number;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel;

  @BelongsTo(() => SizeDatabaseModel)
  size: SizeDatabaseModel;
}
