import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class MessageDto {
  @ApiProperty({
    example: 'Ваш заказ прибыл в пункт назначения!',
    description: 'Сообщение',
  })
  readonly message: string;
}
