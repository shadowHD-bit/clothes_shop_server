import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/users.model';


@Table({ tableName: 'notifications' })
export class NotificationDatabaseModel extends Model<NotificationDatabaseModel> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Ваш заказ прибыл в пункт назначения!', description: 'Сообщение'})
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  message: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User

  
}
