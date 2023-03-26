import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class GetOrderCompleteDto {
  @ApiProperty({
    example: true,
    description: 'Флаг доставки товара',
  })
  readonly isComplete: boolean;
}
