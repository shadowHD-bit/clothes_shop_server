import { ApiProperty } from '@nestjs/swagger/dist/decorators';
import { Model, Table, Column, DataType, HasOne, HasMany } from 'sequelize-typescript';
import { ResetPasswordDatabaseModel } from '../../auth/reset-psw/reset-psw.model';
import { SocialGoogleUserDataModel } from '../../auth/social-auth/google-auth/google-auth.model';
import { SocialUserDataModel } from '../../auth/social-auth/vk-auth/vk-auth.model';
import { BasketDataModel } from '../basket/models/basket.model';
import { HistoryViewProductsDataModel } from '../history/history-view-product/history-view-product.model';
import { LikeDatabaseModel } from '../likes/models/likes.model';
import { NotificationDatabaseModel } from '../notification/notification.model';
import { OrderDatabaseModel } from '../orders/model/order.model';
import { AnswersDatabaseModel } from '../qa/answers/answer.model';
import { QuestionDatabaseModel } from '../qa/questions/question.model';
import { ReviewDatabaseModel } from '../reviews/review.model';

interface UserCreationAttributes {
  email: string;
  password: string;
  firstName: string;
  secondName: string;
  numberPhone: string;
  dateBirthday: string;
  gender: boolean;
  allowMailling: boolean;
  role: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({example: '1', description: 'Идентификатор'})
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({example: 'Иван', description: 'Имя'})
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  firstName: string;

  @ApiProperty({example: 'Иванович', description: 'Фамилиия'})
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  secondName: string;

  @ApiProperty({example: 'Ivan_ivanovich@mail.ru', description: 'Электронная почта'})
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({example: 'ivantop12345', description: 'Пароль'})
  @Column({ type: DataType.STRING, unique: false, allowNull: false })
  password: string;

  @ApiProperty({example: '06.06.2006', description: 'Дата рождения'})
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  dateBirthday: string;

  @ApiProperty({example: '+79825614235', description: 'Номер телефона'})
  @Column({ type: DataType.STRING, unique: false, allowNull: true })
  numberPhone: string;

  @ApiProperty({example: true, description: 'Пол'})
  @Column({ type: DataType.BOOLEAN, unique: false, allowNull: true })
  gender: boolean;

  @ApiProperty({example: "USER", description: 'Роль'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'USER',
  })
  role: string;

  @ApiProperty({example: 'default_avatar.png', description: 'Аватар'})
  @Column({
    type: DataType.STRING,
    unique: false,
    allowNull: false,
    defaultValue: 'default_avatar.png',
  })
  avatar: string;

  @ApiProperty({example: true, description: 'Флаг разрешения на рассылку'})
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
    defaultValue: false,
  })
  allowMailling: boolean;

  @ApiProperty({example: false, description: 'Флаг регистрации через Google'})
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
    defaultValue: false,
  })
  isGoogleAccount: boolean;

  @ApiProperty({example: false, description: 'Флаг регистрации через VK'})
  @Column({
    type: DataType.BOOLEAN,
    unique: false,
    allowNull: false,
    defaultValue: false,
  })
  isVkAccount: boolean;

  @HasOne(() => SocialUserDataModel)
  socialData: SocialUserDataModel

  @HasOne(() => BasketDataModel)
  basket: BasketDataModel

  @HasOne(() => LikeDatabaseModel)
  like: LikeDatabaseModel

  @HasOne(() => SocialGoogleUserDataModel)
  socialGoogleData: SocialGoogleUserDataModel

  @HasOne(() => ResetPasswordDatabaseModel)
  resetPassword: ResetPasswordDatabaseModel

  @HasMany(() => NotificationDatabaseModel)
  notification: NotificationDatabaseModel

  @HasMany(() => HistoryViewProductsDataModel)
  history: HistoryViewProductsDataModel

  @HasMany(() => ReviewDatabaseModel)
  review: ReviewDatabaseModel

  @HasMany(() => AnswersDatabaseModel)
  answer: AnswersDatabaseModel

  @HasMany(() => QuestionDatabaseModel)
  question: QuestionDatabaseModel

  @HasMany(() => OrderDatabaseModel)
  order: OrderDatabaseModel
  
}
