import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class BannedUserDto {

  @ApiProperty({example: 'test@test.ru', description: 'Электронная почта пользователя'})
  readonly email: string;

  @ApiProperty({example: 'Нарушение правил сервиса!', description: 'Причина блокировки'})
  readonly reason: string;

  @ApiProperty({example: '15', description: 'Идентификатор пользователя'})
  readonly userId: number;
}
