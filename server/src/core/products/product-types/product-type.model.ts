import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, HasOne } from 'sequelize-typescript';
import { ProductDatabaseModel } from '../product.model';

@Table({ tableName: 'product_types' })
export class ProductTypeDatabaseModel extends Model<ProductTypeDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Рубашка',
    description: 'Наименования типа',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29sb-sdb8sb-dsb818sd.png',
    description: 'Изображение типа',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  img: string;

  @HasOne(() => ProductDatabaseModel)
  products: ProductDatabaseModel;
}
