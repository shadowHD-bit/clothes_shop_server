import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class ResetPasswordUpdateDto {

  @ApiProperty({example: 't$2y$06$doGnefu9cbLkJTn8sef7U.dynHJFe5hS6xp7vLWb2Zu7e8cOuMVmS', description: 'Токен смены пароля пользователя'})
  readonly token: string;

  @ApiProperty({example: 'testpsw', description: 'Пароль пользователя'})
  readonly password: string;
}
