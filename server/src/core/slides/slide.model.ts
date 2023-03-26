import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'slides' })
export class SlideDatabaseModel extends Model<SlideDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Новая коллекция',
    description: 'Наименование слайда',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Перейдите в каталог чтобы увидеть новую коллекцию',
    description: 'Текст слайда',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  text: string;

  @ApiProperty({
    example: 'dfb2-df92b9fdb-dfb88df1b-8fd1b1.jpg',
    description: 'Фон слайда',
  })
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  img: string;
}
