import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateSizeProductDto {

    @ApiProperty({ example: '5', description: 'Идентификатор размера' })
    readonly sizeId: number;
  
    @ApiProperty({ example: '1', description: 'Идентификатор товара' })
    readonly productId: number;

    @ApiProperty({ example: '1', description: 'Количество товара для данного размера' })
    readonly count: number;

}
