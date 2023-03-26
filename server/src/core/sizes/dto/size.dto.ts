import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CreateSizeDto {

  @ApiProperty({
    example: '46',
    description: 'Тестовое описание размера',
  })
  readonly size: string;

}
