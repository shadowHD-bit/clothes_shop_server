import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class UpdateDisplayProductDto {
  @ApiProperty({ example: '1', description: 'Идентификатор' })
  readonly id: number;

  @ApiProperty({
    example: true,
    description: 'Параметр отображения товара на странице магазина',
  })
  readonly isDisplay: boolean;
}
