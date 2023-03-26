import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class ResetPasswordCreateDto {

  @ApiProperty({example: 'test@test.ru', description: 'Электронная почта пользователя'})
  readonly email: string;

}
