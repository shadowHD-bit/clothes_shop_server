import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class CreateUserDto {

  @ApiProperty({example: 'Иван', description: 'Имя'})
  readonly firstName: string;

  @ApiProperty({example: 'Иванович', description: 'Фамилиия'})
  readonly secondName: string;

  @ApiProperty({example: 'Ivan_ivanovich@mail.ru', description: 'Электронная почта'})
  readonly email: string;
  
  @ApiProperty({example: 'ivantop12345', description: 'Пароль'})
  readonly password: string;

  @ApiProperty({example: '06.06.2006', description: 'Дата рождения'})
  readonly dateBirthday:string;

  @ApiProperty({example: '+79825614235', description: 'Номер телефона'})
  readonly numberPhone: string;

  @ApiProperty({example: true, description: 'Пол'})
  readonly gender: boolean;

  @ApiProperty({example: "USER", description: 'Роль'})
  readonly role: string;

  @ApiProperty({example: true, description: 'Флаг разрешения на рассылку'})
  readonly allowMailling: boolean;

}
