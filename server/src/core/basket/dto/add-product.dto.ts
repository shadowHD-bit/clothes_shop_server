import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class AddProductInBasketDto {

  @ApiProperty({example: '1', description: 'Идентификатор товара'})
  readonly productId: number;

  @ApiProperty({example: '1', description: 'Идентификатор размера'})
  readonly sizeId: number;
  @ApiProperty({example: '1', description: 'Количество товара'})
  readonly count: number;
}
