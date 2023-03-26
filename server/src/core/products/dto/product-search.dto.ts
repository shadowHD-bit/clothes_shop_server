import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class SearchProductDto {
  @ApiProperty({
    example: 'Adidas Pro Length 7X',
    description: 'Наименования товара',
  })
  readonly name: string;

}
