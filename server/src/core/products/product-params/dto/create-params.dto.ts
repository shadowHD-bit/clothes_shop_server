import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class ParamsProductDto {
  @ApiProperty({
    example: 'Производитель',
    description: 'Название параметра',
  })
  readonly title: string;

  @ApiProperty({
    example: 'Германия',
    description: 'Описание параметра',
  })
  readonly description: string;

  @ApiProperty({
    example: '1',
    description: 'Идентификатор товара',
  })
  readonly productId: number;
}
