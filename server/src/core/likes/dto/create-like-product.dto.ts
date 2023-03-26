import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateProductLikesDto {
  @ApiProperty({ example: '1', description: 'Идентификатор корзины понравившихся товаров' })
  readonly likeId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  readonly productId: number;

}
