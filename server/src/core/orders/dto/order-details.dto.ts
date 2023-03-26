import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class OrderDetailDto {
  @ApiProperty({ example: 'Алексей', description: 'Имя покупателя' })
  firstName: string;

  @ApiProperty({ example: 'Куриков', description: 'Фамилия покупателя' })
  secondName: string;

  @ApiProperty({
    example: '89089566025',
    description: 'Номер телефона покупателя',
  })
  numberPhone: string;

  @ApiProperty({ example: 'Россия', description: 'Страна доставки' })
  country: string;

  @ApiProperty({ example: 'Томск', description: 'Город доставки' })
  city: string;

  @ApiProperty({ example: 'Пушкина', description: 'Улица' })
  street: string;

  @ApiProperty({ example: '15', description: 'Номер дома' })
  numberHome: string;

  @ApiProperty({ example: '28', description: 'Номер квартиры' })
  numberApartment: string;

  @ApiProperty({ example: '625785', description: 'Почтовый индекс' })
  zipCode: string;

  @ApiProperty({ example: 15, description: 'Размер скидки' })
  sale: number;

  @ApiProperty({ example: true, description: 'Флаг платной доставки' })
  paymentDelivery: boolean;

  @ApiProperty({ example: 14558, description: 'Общая стоимость' })
  totalPrice: number;
}
