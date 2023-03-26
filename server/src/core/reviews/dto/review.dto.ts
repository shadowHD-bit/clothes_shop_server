import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class ReviewDto {
  @ApiProperty({ example: 'Крутой товар', description: 'Тест отзыва' })
  text: string;

  @ApiProperty({
    example: true,
    description: 'Соответствие доставки',
  })
  deliveryRespond: boolean;

  @ApiProperty({
    example: true,
    description: 'Соответствие размеру',
  })
  sizeRespond: boolean;

  @ApiProperty({
    example: false,
    description: 'Соответствие описанию',
  })
  descriptionRespond: boolean;

  @ApiProperty({
    example: 47,
    description: 'Размер товара',
  })
  size: number;

  @ApiProperty({
    example: 5,
    description: 'Рейтинг',
  })
  rate: number;

  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  productId: number;
}
