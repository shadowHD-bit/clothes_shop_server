import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class LoginUserDto {

  @ApiProperty({example: 'Ivan_ivanovich@mail.ru', description: 'Электронная почта'})
  readonly email: string;
  
  @ApiProperty({example: 'ivantop12345', description: 'Пароль'})
  readonly password: string;

}
