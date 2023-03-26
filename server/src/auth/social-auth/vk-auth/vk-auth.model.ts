import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../../core/users/users.model';

interface SocialUsers {
  idSocial: string;
  userId: number;
}

@Table({ tableName: 'user_vk_data' })
export class SocialUserDataModel extends Model<SocialUserDataModel, SocialUsers> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: '18181181', description: 'Идентификатор социальной сети пользователя Vk'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  idSocial: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User
}