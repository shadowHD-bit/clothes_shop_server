import { User } from './../../core/users/users.model';
import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, HasOne, BelongsTo, ForeignKey } from 'sequelize-typescript';


@Table({ tableName: 'reset_password_tokens' })
export class ResetPasswordDatabaseModel extends Model<ResetPasswordDatabaseModel> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: '$2y$06$doGnefu9cbLkJTn8sef7U.dynHJFe5hS6xp7vLWb2Zu7e8cOuMVmS', description: 'Токен востановления пароля'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  token: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  @ForeignKey(() => User)
  userId: number;
 
  @BelongsTo(() => User)
  user: User
}
