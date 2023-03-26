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

@Table({ tableName: 'product_reviews' })
export class ReviewDatabaseModel extends Model<ReviewDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Крутой товар', description: 'Тест отзыва' })
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  text: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29sb-sdb8sb-dsb818sd.png',
    description: 'Фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgFirst: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29sb-sdb8sb-dsb818sd.png',
    description: 'Фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgSecond: string;

  @ApiProperty({
    example: 'sdv929ds-sd9b29sb-sdb8sb-dsb818sd.png',
    description: 'Фотография',
  })
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  imgThird: string;

  @ApiProperty({
    example: true,
    description: 'Соответствие доставки',
  })
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: false })
  deliveryRespond: boolean;

  @ApiProperty({
    example: true,
    description: 'Соответствие размеру',
  })
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: false })
  sizeRespond: boolean;

  @ApiProperty({
    example: false,
    description: 'Соответствие описанию',
  })
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: false })
  descriptionRespond: boolean;

  @ApiProperty({
    example: 47,
    description: 'Размер товара',
  })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  size: number;

  @ApiProperty({
    example: 5,
    description: 'Рейтинг',
  })
  @Column({ type: DataType.DOUBLE, unique: false, allowNull: false })
  rate: number;

  @ApiProperty({
    example: false,
    description: 'Флаг проверки комментария',
  })
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: false, defaultValue: false })
  isChecked: boolean;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => ProductDatabaseModel)
  productId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => ProductDatabaseModel)
  product: ProductDatabaseModel;
}
