import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class ProductTypeDto {
  @ApiProperty({
    example: 'Рубашка',
    description: 'Наименование типа товара',
  })
  readonly name: string;
}
