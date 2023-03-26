import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class ChangeCountProductInBasketDto {

  @ApiProperty({example: '1', description: 'Идентификатор товара'})
  readonly productId: number;

  @ApiProperty({example: '1', description: 'Идентификатор размера'})
  readonly sizeId: number;

  @ApiProperty({example: '+', description: 'Операция изменения'})
  readonly action: string;
}
