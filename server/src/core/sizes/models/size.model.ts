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
import { ProductSizeDatabaseModel } from './size-product.model';

@Table({ tableName: 'sizes' })
export class SizeDatabaseModel extends Model<SizeDatabaseModel> {
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

  @ApiProperty({ example: '46', description: 'Описание размера' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  size: string;

  @HasMany(() => ProductSizeDatabaseModel)
  size_product: ProductSizeDatabaseModel;
}
