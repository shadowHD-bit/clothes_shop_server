import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

export class AddProductInLikeDto {

  @ApiProperty({example: '1', description: 'Идентификатор товара'})
  readonly productId: number;

}
