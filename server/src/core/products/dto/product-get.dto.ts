import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { ProductParamsDatabaseModel } from '../product-params/product-params.model';

export class GetProductDto {
  @ApiProperty({ example: '1', description: 'Идентификатор типа' })
  readonly productTypeId: number;

  @ApiProperty({ example: '2', description: 'Идентификатор бренда' })
  readonly productBrandId: number;
}
