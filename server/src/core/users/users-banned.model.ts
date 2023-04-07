import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, HasOne, HasMany, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from './users.model';


@Table({ tableName: 'banned_users' })
export class BannedUserModel extends Model<BannedUserModel> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'test@test.ru', description: 'Электронная почта пользователя'})
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  email: string;

  @ApiProperty({example: 'Нарушение правил сервиса!', description: 'Причина блокировки'})
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  reason: string;

  @ApiProperty({example: '14', description: 'Идентификатор администратора, который выбал бан'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  adminId: number;

  @ApiProperty({example: '15', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: false, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User;
}

