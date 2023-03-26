import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Adidas Pro Length 7X',
    description: 'Наименования товара',
  })
  readonly name: string;

  @ApiProperty({ example: '10999', description: 'Цена товара' })
  readonly price: number;

  @ApiProperty({
    example: [
      { title: 'Params1', description: 'description1' },
      { title: 'Params2', description: 'description2' },
    ],
    description: 'Параметры товара',
  })
  readonly info;

  //this Img

  @ApiProperty({
    example: 'Самые новые модели обуви у нас на сайте...',
    description: 'Описание товара',
  })
  readonly description: string;

  @ApiProperty({ example: '1', description: 'Идентификатор типа' })
  readonly productTypeId: number;

  @ApiProperty({ example: '2', description: 'Идентификатор бренда' })
  readonly productBrandId: number;

  @ApiProperty({ example: '3', description: 'Идентификатор баджа' })
  readonly productBadgeId: number;
}
