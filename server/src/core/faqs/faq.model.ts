import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({ tableName: 'faq' })
export class FaqDatabaseModel extends Model<FaqDatabaseModel> {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Можно ли получить товар бесплатно?', description: 'Наименование вопроса'})
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({example: 'Так делать нельзя!', description: 'Информация по данному вопросу'})

  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
  })
  information: string;

}
