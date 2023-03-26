import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, HasOne, HasMany } from 'sequelize-typescript';

@Table({ tableName: 'coupons' })
export class CouponDatabaseModel extends Model<CouponDatabaseModel> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'dsvHsdv4', description: 'Промо-код'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  code: string;

  @ApiProperty({example: '15', description: 'Численное количество скидки'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  discount: number;

}
