import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class NotificationDto {

  @ApiProperty({example: 'Ваш заказ прибыл в пункт назначения!', description: 'Сообщение'})
  readonly message: string;

  @ApiProperty({example: '1', description: 'Идентификатор пользователя'})
  readonly userId: number;

}
