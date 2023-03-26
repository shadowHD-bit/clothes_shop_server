import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateBadgeDto {
  @ApiProperty({
    example: 'Новое',
    description: 'Наименование баджа товара',
  })
  readonly name: string;
}
