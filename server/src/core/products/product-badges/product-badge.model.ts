import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, HasOne } from 'sequelize-typescript';
import { ProductDatabaseModel } from '../product.model';

@Table({ tableName: 'product_badges' })
export class ProductBadgeDatabaseModel extends Model<ProductBadgeDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Adidas Pro Length 7X',
    description: 'Наименования баджа',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @HasOne(() => ProductDatabaseModel)
  product: ProductDatabaseModel;
}
