import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'place_locations' })
export class LocationDatabaseModel extends Model<LocationDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'Магазин', description: 'Наименование места' })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Очный магазин машей компании',
    description: 'Описание списка',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  description: string;

  @ApiProperty({
    example: 'ул. Пушкина 15',
    description: 'Адрес места в текстовом формате',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  textAddress: string;

  @ApiProperty({ example: '15.18188', description: 'Координата X места' })
  @Column({
    type: DataType.DOUBLE,
    unique: false,
    allowNull: false,
  })
  xCoordination: number;

  @ApiProperty({ example: '64.1818', description: 'Координата Y места' })
  @Column({
    type: DataType.DOUBLE,
    unique: false,
    allowNull: false,
  })
  yCoordination: number;
}
