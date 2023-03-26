import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../../core/users/users.model';

interface SocialUsers {
  idSocial: string;
  userId: number;
}

@Table({ tableName: 'user_google_data' })
export class SocialGoogleUserDataModel extends Model<SocialGoogleUserDataModel, SocialUsers> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: '18181181', description: 'Идентификатор социальной сети пользователя Google'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  idSocial: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  @Column({ type: DataType.INTEGER, unique: true, allowNull: false })
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User)
  user: User
}