import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class CheckQuestionDto {
  @ApiProperty({ example: '1', description: 'Идентификатор пользователя' })
  readonly userId: number;

  @ApiProperty({ example: '1', description: 'Идентификатор товара' })
  readonly productId: number;
}
