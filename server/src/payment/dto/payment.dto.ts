import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class PaymentDto {

  @ApiProperty({example: '15555', description: 'Информация о сумме заказа'})
  readonly amount: number;

  @ApiProperty({example: 'Заказ номер 52', description: 'Описание заказа'})
  readonly description: string;
}
