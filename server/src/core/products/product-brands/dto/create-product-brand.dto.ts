import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateBrandDto {
  @ApiProperty({
    example: 'Putin Team',
    description: 'Наименование бренда товара',
  })
  readonly name: string;
}
